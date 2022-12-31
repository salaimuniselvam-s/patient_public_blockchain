import { ethers } from "ethers";

import { ABI } from "../constants";

const AddNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter);

  provider.on(eventFilter, (logs) => {
    const parsedLog = new ethers.utils.Interface(ABI).parseLog(logs);
    cb(parsedLog);
  });
};

export const createEventListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
}) => {
  const PatientRecordModified = contract.filters.PatientRecordModified();
  AddNewEvent(PatientRecordModified, provider, ({ args }) => {
    console.log("PatientRecordModified", args);
  });
};
