import React from "react";
import { useGlobalContext } from "../context";

const Doctors = () => {
  const { user } = useGlobalContext();
  if (user != 1) {
    return <div>No Data</div>;
  }
  return <div>Doctors</div>;
};

export default Doctors;
