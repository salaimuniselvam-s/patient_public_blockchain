import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import {
  Owner,
  parseDate,
  parseInteger,
  parseString,
} from "../utils/ContractEnum";
import Patientinfocontainer from "../components/patientinfocontainer";
import { message } from "antd";

const AllPatients = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Patients, setPatients] = useState([]);

  const getAllPatientRecords = async () => {
    try {
      const records = await contract.getAllPatientRecords();
      const output = records?.map((data) => {
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

        return patient;
      });
      setPatients(output);
    } catch (error) {
      message.error("Get All Patients Failed");
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getAllPatientRecords();
  }, [walletAddress]);

  if (walletAddress != Owner) {
    return <div>No Data</div>;
  }

  return (
    <div className="px-6 py-3">
      {Patients.map((data, key) => {
        let props = { ...data, id: key + 1, user };
        return <Patientinfocontainer {...props} key={key} />;
      })}
    </div>
  );
};

export default AllPatients;
