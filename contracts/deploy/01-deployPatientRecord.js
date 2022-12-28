const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const constructorArguments = []
    log("Deploying PatientRecordSystem and waiting for confirmations...")
    const PatientRecordSystem = await deploy("PatientRecordSystem", {
        from: deployer,
        args: constructorArguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })
    log(`PatientRecordSystem deployed at ${PatientRecordSystem.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(PatientRecordSystem.address, constructorArguments)
    }
}

module.exports.tags = ["all", "PatientRecordSystem"]
