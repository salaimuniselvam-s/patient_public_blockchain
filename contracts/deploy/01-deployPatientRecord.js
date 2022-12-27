const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const constructorArguments = []
    log("Deploying PatientRecord and waiting for confirmations...")
    const PatientRecord = await deploy("PatientRecord", {
        from: deployer,
        args: constructorArguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })
    log(`PatientRecord deployed at ${PatientRecord.address}`)
    console.log(network.name)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(PatientRecord.address, constructorArguments)
    }
}

module.exports.tags = ["all", "PatientRecord"]
