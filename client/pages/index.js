import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import Login from "./login";
import HomePage from "../components/HomePage";
import { ContractEnumState } from "../utils/ContractEnum";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const { contract, walletAddress, setErrorMessage, setUser } =
    useGlobalContext();
  const router = useRouter();

  const requestUserDetails = async () => {
    try {
      const registered = await contract.isRegistered();
      const owner = await contract.owner();
      const { route, enumState } = ContractEnumState(registered);
      setUser(enumState);
      router.push(route);
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };
  useEffect(() => {
    if (walletAddress && contract) requestUserDetails();
  }, [walletAddress, contract]);

  return (
    <>
      <HomePage />
    </>
  );
}
