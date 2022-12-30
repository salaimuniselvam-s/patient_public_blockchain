import React, { useEffect, useState } from "react";
import { Button, Card, message } from "antd";
import { useGlobalContext } from "../context";
const PatientsPharmaInfoContainer = ({ name, street, location, addr }) => {
  const { contract, walletAddress, user } = useGlobalContext();
  const [control, setControl] = useState(false);
  const RevokeAccess = async () => {
    try {
      const tx = await contract.revokeAccessToPharmacy(addr);
      await tx.wait(1);
      message.success(`Access Revoked From Pharmacy(${addr})`);
    } catch (error) {
      message.error("Access Revoke Failed.. Please Try Again");
    }
    hasAccess();
  };
  const GrantAccess = async () => {
    try {
      const tx = await contract.allowAccessToPharmacy(addr);
      await tx.wait(1);
      message.success(`Access Granted To Pharmacy(${addr})`);
    } catch (error) {
      message.error("Access Granting Failed.. Please Try Again");
    }
    hasAccess();
  };
  const hasAccess = async () => {
    try {
      const control = await contract.hasAccessToPharmacy(addr, walletAddress);
      setControl(control);
    } catch (error) {
      message.error("Validating Access To Pharmacy Failed..");
    }
  };
  useEffect(() => {
    if (walletAddress && addr) hasAccess();
  }, [walletAddress, addr]);
  return (
    <>
      <Card className="bg-slate-300 text-xl  w-full mt-3 ">
        <div>
          <div className="grid grid-cols-2 gap-2 justify-between">
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
