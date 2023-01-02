/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from "react";
import Modal from "react-modal";

import CustomButton from "./CustomButton";
import { useGlobalContext } from "../context";
import {
  GetParams,
  SwitchMumbaiPolygonNetwork,
  SwitchNetwork,
} from "../utils/Onboard.js";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const OnboardModal = () => {
  const { chainId } = useGlobalContext();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { updateCurrentWalletAddress } = useGlobalContext();
  const [step, setStep] = useState(-1);

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1);
  }

  useEffect(() => {
    resetParams();

    window?.ethereum?.on("chainChanged", () => {
      resetParams();
    });

    window?.ethereum?.on("accountsChanged", () => {
      resetParams();
    });
  }, []);

  const openFauct = () => {
    if (chainId == 5) {
      window.open("https://goerlifaucet.com/", "_blank");
    }
    if (chainId == 80001) {
      window.open("https://faucet.polygon.technology/", "_blank");
    }
  };

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p>You don't have Wallet installed!</p>
            <CustomButton
              title="Download Wallet"
              handleClick={() =>
                window.open(
                  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
                  "_blank"
                )
              }
            />
          </>
        );

      case 1:
        return (
          <>
            <p>You haven't connected your account to Metamask Wallet!</p>
            <CustomButton
              title="Connect Account"
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p>You're on a different network. Switch To Polygon</p>
            {/* <CustomButton title=" Goerli" handleClick={SwitchNetwork} />
            or */}
            <CustomButton
              title=" Polygon"
              handleClick={SwitchMumbaiPolygonNetwork}
            />
          </>
        );

      case 3:
        return (
          <>
            <p>Oops, you don't have Ethers in your account</p>
            <CustomButton
              title="Grab some test tokens"
              handleClick={openFauct}
            />
          </>
        );

      default:
        return <p>Good to go!</p>;
    }
  };

  return (
    <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
      <div className="flex flex-col items-center gap-3 text-black">
        {generateStep(step)}
      </div>
    </Modal>
  );
};

export default OnboardModal;
