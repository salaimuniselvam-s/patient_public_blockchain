import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { parseDate, parseInteger, parseString } from "../utils/ContractEnum";
import Patientinfocontainer from "../components/patientinfocontainer";

const PharmaPatients = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Patients, setPatients] = useState([]);

  const getAllPatientRecords = async () => {
    const records = await contract.getPatientsOfPharmacy();
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
  };
  useEffect(() => {
    if (contract && walletAddress) getAllPatientRecords();
  }, [walletAddress]);
  if (user != 3) {
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

export default PharmaPatients;