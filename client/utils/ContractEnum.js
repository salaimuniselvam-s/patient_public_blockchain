import { ethers } from "ethers";
import moment from "moment";

const state = {
  "Not Registered": { enumState: 0, route: "/", status: "Unauthorized" },
  "Registered as Patient": {
    enumState: 1,
    route: "/patientinfo",
    status: "Patient",
  },
  "Registered as Doctor": {
    enumState: 2,
    route: "/hospitalinfo",
    status: "Doctor",
  },
  "Registered as Pharmacy": {
    enumState: 3,
    route: "/pharmainfo",
    status: "Pharmacy",
  },
  0: { enumState: "Not Registered", route: "/", status: "Unauthorized" },
  1: {
    enumState: "Registered as Patient",
    route: "/patientinfo",
    status: "Patient",
  },
  2: {
    enumState: "Registered as Doctor",
    route: "/hospitalinfo",
    status: "Doctor",
  },
  3: {
    enumState: "Registered as Pharmacy",
    route: "/pharmainfo",
    status: "Pharmacy",
  },
};
export const ContractEnumState = (value) => {
  return state[value];
};
export const OwnerPrivateKey =
  "a2f5823bba6f2e93283337c56e826a3ea143fadcf27daf67a1a83139b7f6a384";
export const Owner = "0x3dd675dbEFb0bB31E7648864cEB437e4A62ddEb2";
export const formatString = (input) => ethers.utils.formatBytes32String(input);
export const parseString = (input) => ethers.utils.parseBytes32String(input);
export const parseInteger = (input) => input?.toString();
export const parseDate = (input) => moment(input).format("DD-MM-YYYY");
