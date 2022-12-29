const { ethers, getNamedAccounts } = require("hardhat")
const formatString = input => ethers.utils.formatBytes32String(input)
async function main() {
    const { deployer } = await getNamedAccounts()
    const accounts = await ethers.getSigners()

    const PatientRecordSystem = await ethers.getContract(
        "PatientRecordSystem",
        deployer
    )
    await PatientRecordSystem.revokeUser(deployer)
    // console.log(accounts)
    await PatientRecordSystem.authorizeUser(accounts[1].address, 1)
    await PatientRecordSystem.authorizeUser(accounts[2].address, 1)
    await PatientRecordSystem.connect(accounts[1]).addPatientRecord(
        formatString("sms"),
        24,
        formatString("M"),
        formatString("A1")
    )
    await PatientRecordSystem.connect(accounts[2]).addPatientRecord(
        formatString("sms"),
        24,
        formatString("M"),
        formatString("A1")
    )
    const patients = await PatientRecordSystem.getAllPatientRecords()
    console.log(patients)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
