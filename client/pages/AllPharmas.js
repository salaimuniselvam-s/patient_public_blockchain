import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { Owner, parseString } from "../utils/ContractEnum";
import PharmaInfoContainer from "../components/PharmaInfoContainer";
import { Spin, message } from "antd";

const AllPharmas = () => {
  const { user, contract, walletAddress } = useGlobalContext();
  const [Pharmas, setPharmas] = useState([]);
  const [loader, setLoader] = useState(false);

  const getAllPharmaRecords = async () => {
    setLoader(true);
    try {
      const records = await contract.getAllPharmacyRecords();
      const output = records?.map((data) => {
        let Pharma = {
          name: parseString(data["name"]),
          street: parseString(data["street"]),
          addr: data["addr"],
          location: parseString(data["location"]),
        };

        return Pharma;
      });
      setPharmas(output);
    } catch (error) {
      message.error("Get All Phama Records Failed");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (contract && walletAddress) getAllPharmaRecords();
  }, [walletAddress]);

  if (
    walletAddress.toString().toLowerCase() != Owner.toString().toLowerCase()
  ) {
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
      {Pharmas.map((data, key) => {
        let props = { ...data, id: key + 1, user };
        return <PharmaInfoContainer {...props} key={key} />;
      })}
    </div>
  );
};

export default AllPharmas;
