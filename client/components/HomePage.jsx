import React, { useState } from "react";
import { useGlobalContext } from "../context";
import CustomButton from "./CustomButton";
import { ContractEnumState } from "../utils/ContractEnum";
import { useRouter } from "next/dist/client/router";
import { notification } from "antd";

const HomePage = () => {
  const [api, contextHolder] = notification.useNotification();
  const { walletAddress, ownerContract, setErrorMessage, setUser } =
    useGlobalContext();
  const [desc, setDesc] = useState(1);
  const router = useRouter();

  const requestAccess = async () => {
    try {
      const tx = await ownerContract.authorizeUser(walletAddress, desc);
      await tx.wait(1);
      const { status } = ContractEnumState(desc);

      api["success"]({
        message: "Registered Successfully",
        description: `${walletAddress} is Successfully Registered as ${status}`,
        duration: 1,
      });
      setUser(desc);
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
    <div className="px-12 py-12  ">
      {contextHolder}
      <div className=" text-lg">Patient Record System</div>
      <div className="my-3 w-full">
        <select
          placeholder="Join Network"
          onChange={(e) => setDesc(e.target.value)}
          className="form-select form-select-lg mb-3
      appearance-none
      block
      w-full
      px-4
      py-2
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label=".form-select-lg example"
        >
          <option value="1">Patient</option>
          <option value="2">Doctor</option>
          <option value="3">Pharmacy</option>
        </select>
      </div>
      <CustomButton
        title="Request Access"
        handleClick={requestAccess}
        restStyle="my-3 flex justify-center"
      />
    </div>
  );
};

export default HomePage;
