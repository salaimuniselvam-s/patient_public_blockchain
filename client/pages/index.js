import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import Login from "./login";
import HomePage from "../components/HomePage";
import { ContractEnumState } from "../utils/ContractEnum";
import { useRouter } from "next/dist/client/router";
import CustomButton from '../components/CustomButton';
import { Modal } from "antd";
export default function Home() {
  const { contract, walletAddress, setErrorMessage, setUser } =
    useGlobalContext();
  const router = useRouter();
  const [modal, setModal] = useState(false);
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
      <div className="bg-slate-300 flex" style={{ height: "655px" }}>
        <div className=" bg-gradient-to-r from-slate-700  to-slate-300 flex flex-col justify-center w-1/2">
          <div className="text-6xl text-slate-800 mb-16 ml-20">Unauthorised User</div>
          <div className="text-slate-100 mb-5 ml-20">You are not authorised person to access.</div>
          <div className="text-slate-100 mb-5 ml-20">Try request to access.</div>
         <span className="ml-20"> <CustomButton
        title="Click Here to Request Access"
        handleClick={()=>setModal(true)}
        restStyle="my-3 flex justify-center"
          /></span>
                </div>
       <div className="w-1/2 bg-slate-800 h-full "
          style={{ clipPath: "polygon(100% 0%,100% 100%, 0% 100%, 0% 100%)" }}
        ></div>
      </div>
      <Modal title={"Request Access"}
        width="50vw"
        onOk={()=>setModal(false)}
        onCancel={()=>setModal(false)}
        open={modal}
        footer={null}>
        <HomePage />
      </Modal>
    </>
  );
}
