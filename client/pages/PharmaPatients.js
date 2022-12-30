import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { parseDate, parseInteger, parseString } from "../utils/ContractEnum";
import Patientinfocontainer from "../components/patientinfocontainer";
import { Spin, message } from "antd";

const PharmaPatients = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Patients, setPatients] = useState([]);
  const [loader, setLoader] = useState(false);

  const getAllPatientRecords = async () => {
    setLoader(true);
    try {
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
    } catch (error) {
      message.error(`Get Patients Of Pharmacy Failed.. `);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getAllPatientRecords();
  }, [walletAddress]);

  if (user != 3) {
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
        let props = { ...data, id: key + 1, user };
        return <Patientinfocontainer {...props} key={key} />;
      })}
    </div>
  );
};

export default PharmaPatients;
