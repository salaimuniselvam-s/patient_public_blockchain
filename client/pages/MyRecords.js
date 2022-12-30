import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import {
  formatString,
  parseDate,
  parseInteger,
  parseString,
} from "../utils/ContractEnum";
import Patientinfocontainer from "../components/patientinfocontainer";
import { Spin, message } from "antd";

const MyRecords = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Patients, setPatients] = useState([]);
  const [loader, setLoader] = useState(false);

  const getPatientRecords = async () => {
    setLoader(true);
    try {
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
    } catch (error) {
      message.error(`Get Patient Record Failed..`);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getPatientRecords();
  }, [walletAddress]);

  const updateRecords = async (
    { name, age, gender, blood },
    setModal,
    setLoading
  ) => {
    setLoading(true);
    try {
      const tx = await contract.addPatientRecord(
        formatString(name),
        age,
        formatString(gender),
        formatString(blood)
      );
      await tx.wait(1);
      getPatientRecords();
      setModal(false);
      message.success(`Record Successfully Updated`);
    } catch (error) {
      message.error(`Record Update Failed.. Please Try Again..`);
    } finally {
      setLoading(false);
    }
  };

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
      {Patients.map((data, key) => {
        let props = { ...data, id: key + 1, user, updateRecords };
        return <Patientinfocontainer {...props} key={key} />;
      })}
    </div>
  );
};

export default MyRecords;
