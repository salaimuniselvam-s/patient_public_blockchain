import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import HomePage from "../components/HomePage";
import { ContractEnumState } from "../utils/ContractEnum";
import CustomButton from "../components/CustomButton";
import { Modal } from "antd";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { contract, walletAddress, setErrorMessage, user, setUser } =
    useGlobalContext();
  const [modal, setModal] = useState(false);
  const requestUserDetails = async () => {
    try {
      const registered = await contract.isRegistered();
      const { enumState } = ContractEnumState(registered);
      setUser(enumState);
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };
  useEffect(() => {
    if (walletAddress && contract) requestUserDetails();
  }, [walletAddress, contract]);
  console.log(user);
  const Controller = () => {
    if (user == 1) {
      return (
        <>
          <div className="text-slate-100 mb-5 ml-20">
            You are Registered as Patient
          </div>
          <span className="ml-20">
            {" "}
            <CustomButton
              title="Click Here to View Your Records"
              handleClick={() => router.push("/MyRecords")}
              restStyle="my-3 flex justify-center"
            />
          </span>
        </>
      );
    } else if (user == 2) {
      return (
        <>
          <div className="text-slate-100 mb-5 ml-20">
            You are Registered as Doctor
          </div>
          <span className="ml-20">
            {" "}
            <CustomButton
              title="Click Here to View Your Records"
              handleClick={() => router.push("/DoctorDetails")}
              restStyle="my-3 flex justify-center"
            />
          </span>
        </>
      );
    } else if (user == 3) {
      return (
        <>
          <div className="text-slate-100 mb-5 ml-20">
            Your Pharma Details are Registered.
          </div>
          <span className="ml-20">
            {" "}
            <CustomButton
              title="Click Here to View Your Records"
              handleClick={() => router.push("/MyPharma")}
              restStyle="my-3 flex justify-center"
            />
          </span>
        </>
      );
    } else {
      return (
        <>
          <div className="text-slate-100 mb-5 ml-20">
            You are not Registered.
          </div>
          <span className="ml-20">
            {" "}
            <CustomButton
              title="Click Here to Register"
              handleClick={() => setModal(true)}
              restStyle="my-3 flex justify-center"
            />
          </span>
        </>
      );
    }
  };

  return (
    <>
      <div className="bg-slate-300 flex content-area  ">
        <div className=" bg-gradient-to-r from-slate-700  to-slate-300 flex flex-col  justify-center pb-16  w-1/2">
          <div className="text-3xl text-zinc-100 mb-16 ml-20">
            Block Chain Based Patient Records Management System
          </div>
          <Controller />
        </div>

        <div
          className="w-1/2 bg-slate-800  pb-16"
          style={{ clipPath: "polygon(100% 0%,100% 100%, 0% 100%, 0% 100%)" }}
        ></div>
      </div>
      <Modal
        title={"Request Access"}
        width="50vw"
        className="text-white"
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        open={modal}
        footer={null}
      >
        <HomePage setCloseModal={setModal} />
      </Modal>
    </>
  );
}
