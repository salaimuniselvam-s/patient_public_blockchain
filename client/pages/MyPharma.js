import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { Owner, formatString, parseString } from "../utils/ContractEnum";
import PharmaInfoContainer from "../components/PharmaInfoContainer";

const MyPharma = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Pharmas, setPharmas] = useState([]);

  const getPharmaRecord = async () => {
    const data = await contract.getPharmacyRecord();
    let Pharma = {
      name: parseString(data["name"]),
      street: parseString(data["street"]),
      addr: data["addr"],
      location: parseString(data["location"]),
    };

    setPharmas([Pharma]);
  };
  useEffect(() => {
    if (contract && walletAddress) getPharmaRecord();
  }, [walletAddress]);
  const updateRecords = async ({ name, street, location }, setModal) => {
    const tx = await contract.addPharmacyRecord(
      formatString(name),
      formatString(street),
      formatString(location)
    );
    await tx.wait(1);
    getPharmaRecord();
    setModal(false);
  };
  return (
    <div className="px-6 py-3">
      {Pharmas.map((data, key) => {
        let props = { ...data, id: key + 1, user, updateRecords };
        return <PharmaInfoContainer {...props} key={key} />;
      })}
    </div>
  );
};

export default MyPharma;
