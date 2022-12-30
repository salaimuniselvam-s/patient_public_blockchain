import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { parseInteger, parseString } from "../utils/ContractEnum";
import PatientsDoctorContainer from "../components/PatientsDoctorsContainer";
import { Spin, message } from "antd";

const Doctors = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Doctors, setDoctors] = useState([]);
  const [loader, setLoader] = useState(false);

  const getAllDoctorRecords = async () => {
    setLoader(true);
    try {
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
    } catch (error) {
      message.error(`Get All Doctors Record Failed..`);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getAllDoctorRecords();
  }, [walletAddress]);

  if (user != 1) {
    return <div>No Data</div>;
  }

  if (loader) {
    return (
      <div className=" mt-32 all-data-loader">
        <Spin tip="Data is being Fetched.." size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  return (
    <div className="px-6 py-3">
      {Doctors.map((data, key) => {
        let props = { ...data, id: key + 1, user };
        return <PatientsDoctorContainer {...props} key={key} />;
      })}
    </div>
  );
};

export default Doctors;
