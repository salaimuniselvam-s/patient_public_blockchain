const { ethers, getNamedAccounts } = require("hardhat")
const formatString = input => ethers.utils.formatBytes32String(input)
require("dotenv").config()

const feedPatients = async (accounts, PatientRecordSystem) => {
    if (process.env.initial == "true") {
        const tx = await PatientRecordSystem.authorizeUser(
            accounts[1].address,
            1
        )
        await tx.wait(1)
        const tx1 = await PatientRecordSystem.authorizeUser(
            accounts[2].address,
            1
        )
        await tx1.wait(1)
    }
    await PatientRecordSystem.connect(accounts[1]).addPatientRecord(
        formatString("smssss"),
        24,
        formatString("M"),
        formatString("A1")
    )
    await PatientRecordSystem.connect(accounts[2]).addPatientRecord(
        formatString("smsss"),
        24,
        formatString("M"),
        formatString("A1")
    )
    const patients = await PatientRecordSystem.getAllPatientRecords()
    console.log(patients)
}

const feedDoctors = async (accounts, PatientRecordSystem) => {
    if (process.env.initial == "true") {
        const tx = await PatientRecordSystem.authorizeUser(
            accounts[4].address,
            2
        )
        await tx.wait(1)
        const tx1 = await PatientRecordSystem.authorizeUser(
            accounts[5].address,
            2
        )
        await tx1.wait(1)
    }
    await PatientRecordSystem.connect(accounts[4]).addDoctorRecord(
        formatString("doctor1asd"),
        24,
        formatString("M"),
        formatString("mbbs"),
        formatString("GH"),
        formatString("svpr")
    )
    await PatientRecordSystem.connect(accounts[5]).addDoctorRecord(
        formatString("doctor2sad"),
        24,
        formatString("M"),
        formatString("mbbs"),
        formatString("GH"),
        formatString("rjpm")
    )
    const doctors = await PatientRecordSystem.getAllDoctorRecords()
    console.log(doctors)
}

const feedPharmacy = async (accounts, PatientRecordSystem) => {
    if (process.env.initial == "true") {
        const tx = await PatientRecordSystem.authorizeUser(
            accounts[7].address,
            3
        )
        await tx.wait(1)
        const tx1 = await PatientRecordSystem.authorizeUser(
            accounts[8].address,
            3
        )
        await tx1.wait(1)
    }
    await PatientRecordSystem.connect(accounts[7]).addPharmacyRecord(
        formatString("pharma1asd"),
        formatString("east new street"),
        formatString("svpr")
    )
    await PatientRecordSystem.connect(accounts[8]).addPharmacyRecord(
        formatString("pharma2asd"),
        formatString("east ndsfew street"),
        formatString("svasdpr")
    )
    const pharmacy = await PatientRecordSystem.getAllPharmacyRecords()
    console.log(pharmacy)
}
async function main() {
    const { deployer } = await getNamedAccounts()
    const accounts = await ethers.getSigners()

    const PatientRecordSystem = await ethers.getContract(
        "PatientRecordSystem",
        deployer
    )
    // patients - 1,2,3
    await feedPatients(accounts, PatientRecordSystem)

    //doctors-4,5,6
    await feedDoctors(accounts, PatientRecordSystem)

    //Pharmacy-7,8,9
    await feedPharmacy(accounts, PatientRecordSystem)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
