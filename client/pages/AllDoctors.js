import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { Owner, parseInteger, parseString } from "../utils/ContractEnum";
import Doctorinfocontainer from "../components/doctorinfocontainer";

const AllDoctors = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Doctors, setDoctors] = useState([]);

  const getAllDoctorRecords = async () => {
    const records = await contract.getAllDoctorRecords();
    const output = records?.map((data) => {
      let doctor = {
        name: parseString(data["name"]),
        age: parseInteger(data["age"]),
        gender: parseString(data["gender"]),
        qualification: parseString(data["Qualification"]),
        addr: data["addr"],
        hospitalname: parseString(data["HospitalName"]),
        location: parseString(data["location"]),
      };

      return doctor;
    });
    setDoctors(output);
  };
  useEffect(() => {
    if (contract && walletAddress) getAllDoctorRecords();
  }, [walletAddress]);

  if (walletAddress != Owner) {
    return <div>No Data</div>;
  }
  return (
    <div className="px-6 py-3">
      {Doctors.map((data, key) => {
        let props = { ...data, id: key + 1, user };
        return <Doctorinfocontainer {...props} key={key} />;
      })}
    </div>
  );
};

export default AllDoctors;
