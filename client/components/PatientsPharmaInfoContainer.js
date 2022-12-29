import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { useGlobalContext } from "../context";
const PatientsPharmaInfoContainer = ({ name, street, location, addr }) => {
  const { contract, walletAddress, user } = useGlobalContext();
  const [control, setControl] = useState(false);
  const RevokeAccess = async () => {
    const tx = await contract.revokeAccessToPharmacy(addr);
    await tx.wait(1);
    hasAccess();
  };
  const GrantAccess = async () => {
    const tx = await contract.allowAccessToPharmacy(addr);
    await tx.wait(1);
    hasAccess();
  };
  const hasAccess = async () => {
    const control = await contract.hasAccessToPharmacy(addr, walletAddress);
    setControl(control);
  };
  useEffect(() => {
    if (walletAddress && addr) hasAccess();
  }, [walletAddress, addr]);
  return (
    <>
      <Card className="bg-slate-300  w-full mt-3 ">
        <div className="flex  justify-evenly">
          <div className="flex  flex-col mr-6">
            <label>
              <span>Name : </span>
              <span className=" font-semibold text-lg">{name}</span>
            </label>
            <label>
              <span>Street :</span>
              <span className=" font-semibold text-lg">{street}</span>
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
          {user == 1 && (
            <div className="flex justify-center mt-3">
              <Button
                onClick={control ? RevokeAccess : GrantAccess}
                className="px-4 py-1 rounded-lg bg-blue-600 w-fit  font-bold hover text-white"
              >
                {control ? "Revoke Access" : "Grant Access"}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default PatientsPharmaInfoContainer;
