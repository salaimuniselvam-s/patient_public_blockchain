import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { formatString, parseString } from "../utils/ContractEnum";
import PharmaInfoContainer from "../components/PharmaInfoContainer";
import { message } from "antd";

const MyPharma = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Pharmas, setPharmas] = useState([]);

  const getPharmaRecord = async () => {
    try {
      const data = await contract.getPharmacyRecord();
      let Pharma = {
        name: parseString(data["name"]),
        street: parseString(data["street"]),
        addr: data["addr"],
        location: parseString(data["location"]),
      };

      setPharmas([Pharma]);
    } catch (error) {
      message.error(`Get Pharma Record Failed..`);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getPharmaRecord();
  }, [walletAddress]);
  const updateRecords = async ({ name, street, location }, setModal) => {
    try {
      const tx = await contract.addPharmacyRecord(
        formatString(name),
        formatString(street),
        formatString(location)
      );
      await tx.wait(1);
      getPharmaRecord();
      setModal(false);
      message.success(`Record Successfully Updated`);
    } catch (error) {
      message.error(`Record Update Failed.. Please Try Again..`);
    }
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
