import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { GetParams } from "../utils/Onboard.js";
import { ABI, ADDRESS } from "../constants";
import { OwnerPrivateKey } from "../utils/ContractEnum.js";
import { notification } from "antd";
import { useRouter } from "next/dist/client/router.js";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [ownerContract, setOwnerContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(0);
  const [notificationKey, setNotificationKey] = useState(1);
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  //* Reset web3 onboarding modal params
  useEffect(() => {
    const resetParams = async () => {
      const currentStep = await GetParams();

      setStep(currentStep.step);
    };

    resetParams();

    window?.ethereum?.on("chainChanged", () => resetParams());
    window?.ethereum?.on("accountsChanged", () => resetParams());
  }, []);

  //* Set the wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({
      method: "eth_accounts",
    });

    if (accounts?.length > 0) {
      setWalletAddress(`${accounts[0]}`);
    } else {
      const key = `${notificationKey}`;
      notification.destroy(key);
      api["error"]({
        message: "You Haven't Login to Your Metamask",
        description: "Please Login To Your Metamask & Try with Connect Account",
        duration: 2,
        key,
      });
      setNotificationKey(notificationKey + 1);
    }
  };

  useEffect(() => {
    window?.ethereum?.on("accountsChanged", updateCurrentWalletAddress);
  }, []);

  //* Set the smart contract and provider to the state
  useEffect(() => {
    router.push("/");
    const setSmartContractAndProvider = async () => {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const newProvider = new ethers.providers.Web3Provider(connection);
        const signer = newProvider.getSigner();
        const { chainId } = await newProvider.getNetwork();
        const address = ADDRESS[chainId] ? ADDRESS[chainId][0] : "";
        const newContract = new ethers.Contract(address, ABI, signer);
        const wallet = new ethers.Wallet(OwnerPrivateKey, newProvider);
        const ownerContract = new ethers.Contract(address, ABI, wallet);
        setProvider(newProvider);
        setContract(newContract);
        setOwnerContract(ownerContract);
      } catch (error) {
        console.error(error);
      }
    };

    setSmartContractAndProvider();
    updateCurrentWalletAddress();
  }, [walletAddress]);

  //* Handle alerts
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: "" });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  //* Handle error messages
  useEffect(() => {
    if (errorMessage) {
      const parsedErrorMessage = errorMessage?.reason
        ?.slice("execution reverted: ".length)
        .slice(0, -1);

      if (parsedErrorMessage) {
        setShowAlert({
          status: true,
          type: "failure",
          message: parsedErrorMessage,
        });
      } else {
        setShowAlert({
          status: true,
          type: "failure",
          message: errorMessage.reason,
        });
      }
    }
  }, [errorMessage]);

  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAddress,
        updateCurrentWalletAddress,
        showAlert,
        setShowAlert,
        errorMessage,
        setErrorMessage,
        provider,
        step,
        user,
        setUser,
        ownerContract,
      }}
    >
      {contextHolder}
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
