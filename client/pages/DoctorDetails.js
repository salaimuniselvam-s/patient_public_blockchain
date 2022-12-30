import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { formatString, parseInteger, parseString } from "../utils/ContractEnum";
import Doctorinfocontainer from "../components/doctorinfocontainer";

const DoctorDetails = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Doctors, setDoctors] = useState([]);

  const getDoctorRecord = async () => {
    const data = await contract.getDoctorRecord();
    let doctor = {
      name: parseString(data["name"]),
      age: parseInteger(data["age"]),
      gender: parseString(data["gender"]),
      qualification: parseString(data["Qualification"]),
      addr: data["addr"],
      hospitalname: parseString(data["HospitalName"]),
      location: parseString(data["location"]),
    };
    setDoctors([doctor]);
  };
  useEffect(() => {
    if (contract && walletAddress) getDoctorRecord();
  }, [walletAddress]);

  const updateRecords = async (
    { name, age, gender, qualification, hospitalname, location },
    setModal
  ) => {
    const tx = await contract.addDoctorRecord(
      formatString(name),
      age,
      formatString(gender),
      formatString(qualification),
      formatString(hospitalname),
      formatString(location)
    );
    await tx.wait(1);
    getDoctorRecord();
    setModal(false);
  };
  if (user != 2) {
    return <div>No Data</div>;
  }
  return (
    <div className="px-6 py-3">
      {Doctors.map((data, key) => {
        let props = { ...data, id: key + 1, user, updateRecords };
        return <Doctorinfocontainer {...props} key={key} />;
      })}
    </div>
  );
};

export default DoctorDetails;
