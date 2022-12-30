import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { formatString, parseString } from "../utils/ContractEnum";
import PharmaInfoContainer from "../components/PharmaInfoContainer";
import { Spin, message } from "antd";

const MyPharma = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Pharmas, setPharmas] = useState([]);
  const [loader, setLoader] = useState(false);

  const getPharmaRecord = async () => {
    setLoader(true);
    try {
      const data = await contract.getPharmacyRecord();
      let Pharma = {
        name: parseString(data["name"]),
        street: parseString(data["street"]),
        addr: data["addr"],
        location: parseString(data["location"]),
      };

      setPharmas([Pharma]);
    } catch (error) {
      message.error(`Get Pharma Record Failed..`);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getPharmaRecord();
  }, [walletAddress]);

  const updateRecords = async (
    { name, street, location },
    setModal,
    setLoading
  ) => {
    try {
      setLoading(true);
      const tx = await contract.addPharmacyRecord(
        formatString(name),
        formatString(street),
        formatString(location)
      );
      await tx.wait(1);
      getPharmaRecord();
      setModal(false);
      message.success(`Record Successfully Updated`);
    } catch (error) {
      message.error(`Record Update Failed.. Please Try Again..`);
    } finally {
      setLoading(false);
    }
  };

  if (loader) {
    return (
      <div className=" mt-32 all-data-loader">
        <Spin tip="Data is being Fetched.." size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  if (user != 3) {
    return <div>No Data</div>;
  }

  return (
    <div className="px-6 py-3">
      {Pharmas.map((data, key) => {
        let props = { ...data, id: key + 1, user, updateRecords };
        return <PharmaInfoContainer {...props} key={key} />;
      })}
    </div>
  );
};

export default MyPharma;
