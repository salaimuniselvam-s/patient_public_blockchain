import React from "react";
import { useGlobalContext } from "../context";
import CustomButton from "./CustomButton";
import { useRouter } from "next/dist/client/router";
import { notification } from "antd";

const RevokeAccess = () => {
  const [api, contextHolder] = notification.useNotification();
  const { walletAddress, ownerContract, setErrorMessage, setUser } =
    useGlobalContext();

  const router = useRouter();

  const revokeAccess = async () => {
    try {
      const tx = await ownerContract.revokeUser(walletAddress);
      tx.wait(1);

      api["success"]({
        message: "Revoked Successfully",
        description: `${walletAddress} is Successfully Removed from the records`,
        duration: 1,
        onClose: () => router.push("/"),
      });
      setUser(0);
    } catch (error) {
      console.error(error);
      api["error"]({
        message: "Request Access Failed",
        description: error.reason,
        duration: 2,
      });
      setErrorMessage(error);
    }
  };
  return (
    <div>
      {contextHolder}
      <div>RevokeAccess</div>
      <CustomButton
        title="Revoke Access"
        handleClick={revokeAccess}
        restStyle="my-3 flex justify-center"
      />
    </div>
  );
};

export default RevokeAccess;
