import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { parseString } from "../utils/ContractEnum";
import PatientsPharmaInfoContainer from "../components/PatientsPharmaInfoContainer";

const Pharma = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Pharmas, setPharmas] = useState([]);

  const getAllPharmaRecords = async () => {
    const records = await contract.getAllPharmacyRecords();
    const output = records?.map((data) => {
      let Pharma = {
        name: parseString(data["name"]),
        street: parseString(data["street"]),
        addr: data["addr"],
        location: parseString(data["location"]),
      };

      return Pharma;
    });
    setPharmas(output);
  };
  useEffect(() => {
    if (contract && walletAddress) getAllPharmaRecords();
  }, [walletAddress]);
  if (user == 0) {
    return <div>No Data</div>;
  }
  return (
    <div className="px-6 py-3">
      {Pharmas.map((data, key) => {
        let props = { ...data, id: key + 1, user };
        return <PatientsPharmaInfoContainer {...props} />;
      })}
    </div>
  );
};

export default Pharma;
