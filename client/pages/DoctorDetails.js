import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { formatString, parseInteger, parseString } from "../utils/ContractEnum";
import Doctorinfocontainer from "../components/doctorinfocontainer";
import { Spin, message } from "antd";

const DoctorDetails = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Doctors, setDoctors] = useState([]);
  const [loader, setLoader] = useState(false);

  const getDoctorRecord = async () => {
    setLoader(true);
    try {
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
    } catch (error) {
      message.error("Get Doctor Record Failed");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getDoctorRecord();
  }, [walletAddress]);

  const updateRecords = async (
    { name, age, gender, qualification, hospitalname, location },
    setModal,
    setLoading
  ) => {
    setLoading(true);
    try {
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
      message.success(`Record Successfully Updated`);
    } catch (error) {
      message.error(`Record Update Failed.. Please Try Again..`);
    } finally {
      setLoading(false);
    }
  };

  if (user != 2) {
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
        let props = { ...data, id: key + 1, user, updateRecords };
        return <Doctorinfocontainer {...props} key={key} />;
      })}
    </div>
  );
};

export default DoctorDetails;
