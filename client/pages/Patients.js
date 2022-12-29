import React from "react";
import { useGlobalContext } from "../context";

const Patients = () => {
  const { user } = useGlobalContext();
  if (user != 2) {
    return <div>No Data</div>;
  }
  return <div>Patients</div>;
};

export default Patients;
