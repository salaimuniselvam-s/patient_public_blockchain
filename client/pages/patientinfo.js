import React from "react";
import RevokeAccess from "../components/RevokeAccess";
import { useGlobalContext } from "../context";

const patientInfo = () => {
  const { user } = useGlobalContext();
  if (user != 1) {
    return <div>No Data</div>;
  }

  return (
    <div>
      patientInfo
      <RevokeAccess />
    </div>
  );
};

export default patientInfo;
