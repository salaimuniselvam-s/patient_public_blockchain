/* eslint-disable prefer-destructuring */

import { TEST_CHAIN } from "./ContractEnum";
import { ethers } from "ethers";
ethers.utils.hexlify(80001);

function isEthereum() {
  if (window.ethereum) {
    return true;
  }
  return false;
}

function getChainID() {
  if (isEthereum()) {
    return parseInt(window.ethereum.chainId, 16);
  }
  return 0;
}

async function handleConnection(accounts) {
  if (accounts.length === 0) {
    try {
      const fetchedAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return fetchedAccounts;
    } catch (error) {
      console.error(error);
    }
  }

  return accounts;
}

async function requestAccount() {
  let currentAccount = 0x0;
  if (isEthereum() && getChainID() !== 0) {
    try {
      let accounts = await window.ethereum.request({ method: "eth_accounts" });
      accounts = await handleConnection(accounts);
      currentAccount = accounts[0];
    } catch (error) {
      console.error(error);
    }
  }
  return currentAccount;
}

async function requestBalance(currentAccount) {
  let currentBalance = 0;
  if (isEthereum()) {
    try {
      currentBalance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [currentAccount, "latest"],
      });

      currentBalance = parseInt(currentBalance, 16) / 1e18;

      return { currentBalance, err: false };
    } catch (err) {
      return { currentBalance, err: true };
    }
  }
  return { currentBalance, err: true };
}

export const GetParams = async () => {
  const response = {
    isError: false,
    message: "",
    step: -1,
    balance: 0,
    account: "0x0",
  };

  if (!isEthereum()) {
    response.step = 0;
    return response;
  }
  let currentAccount;
  try {
    currentAccount = await requestAccount();
  } catch (error) {
    console.error(error);
  }
  if (currentAccount === 0x0 || currentAccount == undefined) {
    response.step = 1;
    return response;
  }

  response.account = currentAccount;
  if (
    !TEST_CHAIN.includes(getChainID()) &&
    getChainID() !== 31337 &&
    getChainID() !== 1337
  ) {
    response.step = 2;
    return response;
  }

  const { currentBalance, err } = await requestBalance(currentAccount);
  if (err) {
    response.isError = true;
    response.message = "Error fetching balance!";
    return response;
  }
  response.balance = currentBalance;

  if (currentBalance < 0.2) {
    response.step = 3;
    return response;
  }

  return response;
};

export async function SwitchNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }],
    });
  } catch (error) {
    console.error(error);
    if (error.code == 4902) {
      // let hex_chainId = ethers.utils.hexValue(5);
      await window?.ethereum
        ?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x5",
              chainName: "Goerli",
              nativeCurrency: {
                name: "GoerliETH",
                symbol: "GoerliETH",
                decimals: 18,
              },
              rpcUrls: ["https://goerli.infura.io/v3/"],
              blockExplorerUrls: ["https://goerli.etherscan.io"],
            },
          ],
        })
        .catch((error) => console.error(error));
    }
  }
}

export async function SwitchMumbaiPolygonNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }],
    });
  } catch (error) {
    console.error(error);
    if (error.code == 4902) {
      // let hex_chainId = ethers.utils.hexValue(5);
      await window?.ethereum
        ?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              chainName: "Mumbai Polygon",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: [
                "https://polygon-mumbai.g.alchemy.com/v2/FizZKOR3E3N1lDdeBQ1lMoXLv1SncZcT",
              ],
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            },
          ],
        })
        .catch((error) => console.error(error));
    }
  }
}
