import React from "react";
import { useGlobalContext } from "../context";

const DoctorDetails = () => {
  const { user } = useGlobalContext();
  if (user != 2) {
    return <div>No Data</div>;
  }
  return <div>DoctorDetails</div>;
};

export default DoctorDetails;
