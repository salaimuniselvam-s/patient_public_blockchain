import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { parseDate, parseInteger, parseString } from "../utils/ContractEnum";
import Patientinfocontainer from "../components/patientinfocontainer";
import { formatBytes32String } from "ethers/lib/utils";

const MyRecords = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Patients, setPatients] = useState([]);

  const getPatientRecords = async () => {
    const data = await contract.getPatientRecord();
    let patient = {
      name: parseString(data["name"]),
      age: parseInteger(data["age"]),
      gender: parseString(data["gender"]),
      blood: parseString(data["bloodGroup"]),
      addr: data["addr"],
      timestamp: parseDate(data["timestamp"]),
      updatedby: data["updatedBy"],
      pharmacy: data["pharmacy"],
      description: data["description"],
    };

    setPatients([patient]);
  };
  useEffect(() => {
    if (contract && walletAddress) getPatientRecords();
  }, [walletAddress]);

  const updateRecords = async ({ name, age, gender, blood }, setModal) => {
    const tx = await contract.addPatientRecord(
      formatBytes32String(name),
      age,
      formatBytes32String(gender),
      formatBytes32String(blood)
    );
    await tx.wait(1);
    getPatientRecords();
    setModal(false);
  };
  if (user != 1) {
    return <div>No Data</div>;
  }
  return (
    <div className="px-6 py-3">
      {Patients.map((data, key) => {
        let props = { ...data, id: key + 1, user, updateRecords };
        return <Patientinfocontainer {...props} />;
      })}
    </div>
  );
};

export default MyRecords;
