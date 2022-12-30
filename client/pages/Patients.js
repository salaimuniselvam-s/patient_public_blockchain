import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import {
  Owner,
  formatString,
  parseDate,
  parseInteger,
  parseString,
} from "../utils/ContractEnum";
import Patientinfocontainer from "../components/patientinfocontainer";
import { message } from "antd";

const Patients = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Patients, setPatients] = useState([]);

  const getPatientsOfDoctors = async () => {
    try {
      const records = await contract.getPatientsOfDoctors();
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
      message.error(`Get Patients Of Doctors Failed..`);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getPatientsOfDoctors();
  }, [walletAddress]);

  const updateRecords = async ({ addr, pharmacy, description }, setModal) => {
    try {
      const tx = await contract.modifyPatientRecord(
        addr,
        pharmacy.toString().trim(),
        description
      );
      await tx.wait(1);
      getPatientsOfDoctors();
      setModal(false);
      message.success(`Record Successfully Updated`);
    } catch (error) {
      message.error(`Record Update Failed.. Please Try Again..`);
    }
  };

  if (user != 2) {
    return <div>No Data</div>;
  }
  return (
    <div className="px-6 py-3">
      {Patients.map((data, key) => {
        let props = {
          ...data,
          id: key + 1,
          user,
          isDoctor: true,
          updateRecords,
        };
        return <Patientinfocontainer {...props} key={key} />;
      })}
    </div>
  );
};

export default Patients;
