import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { parseDate, parseInteger, parseString } from "../utils/ContractEnum";
import Patientinfocontainer from "../components/patientinfocontainer";
import { Spin, message } from "antd";

const Patients = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Patients, setPatients] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pharmacyAddress, setPharmacy] = useState([]);

  const getPatientsOfDoctors = async () => {
    setLoader(true);
    try {
      const records = await contract.getPatientsOfDoctors();
      const pharmacy = await contract.getAllPharmacyAddress();
      setPharmacy(pharmacy);
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
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getPatientsOfDoctors();
  }, [walletAddress]);

  const updateRecords = async (
    { addr, pharmacy, description },
    setModal,
    setLoading
  ) => {
    setLoading(true);
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
      {Patients.map((data, key) => {
        let props = {
          ...data,
          id: key + 1,
          user,
          isDoctor: true,
          updateRecords,
          pharmacyAddress,
        };
        return <Patientinfocontainer {...props} key={key} />;
      })}
    </div>
  );
};

export default Patients;
