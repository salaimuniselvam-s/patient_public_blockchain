const fs = require("fs")
const { network, ethers } = require("hardhat")
const frontEndContractsFile = "../client/constants/contractAddresses.json"
const frontEndAbiFile = "../client/constants/abi.json"
require("dotenv").config()

const CONTRACT_NAME = process.env.CONTRACT_NAME || ""

async function updateAbi() {
    const contractName = await ethers.getContract(CONTRACT_NAME)
    fs.writeFileSync(
        frontEndAbiFile,
        contractName.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const contractName = await ethers.getContract(CONTRACT_NAME)
    const contractAddresses = JSON.parse(
        fs.readFileSync(frontEndContractsFile, "utf8")
    )
    if (network.config.chainId.toString() in contractAddresses) {
        if (
            !contractAddresses[network.config.chainId.toString()].includes(
                contractName.address
            )
        ) {
            contractAddresses[network.config.chainId.toString()].push(
                contractName.address
            )
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [
            contractName.address
        ]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

module.exports.tags = ["all", "frontend"]
