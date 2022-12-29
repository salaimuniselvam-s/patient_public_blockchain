import React from "react";
import { useGlobalContext } from "../context";

const Pharma = () => {
  const { user } = useGlobalContext();
  if (user == 0) {
    return <div>No Data</div>;
  }
  return <div>Pharma</div>;
};

export default Pharma;
