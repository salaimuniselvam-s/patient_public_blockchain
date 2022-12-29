import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { Owner } from "../utils/ContractEnum";

const AllPatients = () => {
  const { contract, walletAddress } = useGlobalContext();

  const getAllPatientRecords = async () => {
    const records = await contract.getAllPatientRecords();
    console.log(records);
  };
  useEffect(() => {
    if (contract && walletAddress) getAllPatientRecords();
  }, [walletAddress]);

  if (walletAddress != Owner) {
    return <div>No Data</div>;
  }

  return <div>AllPatients</div>;
};

export default AllPatients;
