import React from "react";
import { Button, Card } from "antd";
import { useGlobalContext } from "../context";
const PatientsDoctorContainer = ({
  name,
  age,
  gender,
  qualification,
  hospitalname,
  addr,
  location,
}) => {
  const { walletAddress, user } = useGlobalContext();
  const GrantAccess = () => {
    console.log("user");
  };

  return (
    <>
      <Card className="bg-slate-300  w-full mt-3 ">
        <div className=" text-2xl font-bold">Doctor Details</div>
        <label>
          <span>Name : </span>
          <span className=" font-semibold text-lg">{name}</span>
        </label>
        <div className="flex  justify-evenly">
          <div className="flex  flex-col mr-6">
            <label>
              <span>Qualification : </span>
              <span className=" font-semibold text-lg">{qualification}</span>
            </label>
            <label>
              <span>Age :</span>
              <span className=" font-semibold text-lg">{age}</span>
            </label>
            <label>
              <span>Gender : </span>
              <span className=" font-semibold text-lg">{gender}</span>
            </label>
          </div>
          <div className="flex  flex-col mr-6">
            <label>
              <span>Hospital :</span>
              <span className=" font-semibold text-lg">{hospitalname}</span>
            </label>
            <label>
              <span>Address : </span>
              <span className=" font-semibold text-lg">{addr}</span>
            </label>
            <label>
              <span>Location : </span>
              <span className=" font-semibold text-lg">{location}</span>
            </label>
          </div>
        </div>
        {user == 1 && (
          <div className="flex justify-center mt-3">
            <Button onClick={GrantAccess} className="bg-blue-500 text-white">
              Access
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default PatientsDoctorContainer;
