import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { Owner, parseInteger, parseString } from "../utils/ContractEnum";
import Doctorinfocontainer from "../components/doctorinfocontainer";
import { Spin, message } from "antd";

const AllDoctors = () => {
  const { user, contract, walletAddress, chainId } = useGlobalContext();
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
      message.error("Get All Doctor Records Failed");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getAllDoctorRecords();
  }, [walletAddress]);

  if (walletAddress.toString().toLowerCase() != Owner(chainId).toLowerCase()) {
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
        return <Doctorinfocontainer {...props} key={key} />;
      })}
    </div>
  );
};

export default AllDoctors;
