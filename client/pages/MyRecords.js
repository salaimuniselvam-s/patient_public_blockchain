import React from "react";
import { useGlobalContext } from "../context";

const MyRecords = () => {
  const { user } = useGlobalContext();
  if (user != 1) {
    return <div>No Data</div>;
  }
  return <div>MyRecords</div>;
};

export default MyRecords;
