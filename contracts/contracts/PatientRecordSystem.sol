// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

error UnauthorizedDoctor();
error AlreadyRegisteredAsPatient();
error AlreadyRegisteredAsDoctor();
error AlreadyRegisteredAsPharmacy();
error UnauthorizedRole();
error NotRegisteredAsPatient();
error NotRegisteredAsDoctor();
error NotRegisteredAsPharmacy();

contract PatientRecordSystem is Ownable {
    enum AccessControls {
        Unauthorized,
        Patient,
        Doctor,
        Pharmacy
    }
    struct PatientRecord {
        string name;
        uint age;
        string gender;
        string bloodGroup;
        address addr;
        uint timestamp;
        address updatedBy;
        address pharmacy;
        string description;
    }
    struct DoctorRecord {
        string name;
        uint age;
        string gender;
        string Qualification;
        string HospitalName;
        string location;
        address addr;
    }
    struct PharmacyRecord {
        string name;
        string street;
        string location;
        address addr;
    }
    mapping(address => AccessControls) allowAccess;
    mapping(address => PatientRecord) patientRecordDetails;
    PatientRecord[] patientRecords;
    mapping(address => DoctorRecord) doctorRecordDetails;
    DoctorRecord[] doctorRecords;
    mapping(address => PharmacyRecord) pharmacyRecordDetails;
    PharmacyRecord[] pharmacyRecords;

    mapping(address => mapping(address => bool)) hasAccessToDoctor;
    mapping(address => mapping(address => bool)) hasAccessToPharmacy;

    event PatientRecordsAdded(address Patient);
    event DoctorRecordsAdded(address Doctor);
    event PharmacyRecordsAdded(address Pharmacy);
    event AccessGrantedToDoctor(address Patient, address Doctor);
    event AccessGrantedToPharmacy(address Patient, address Pharmacy);
    event AccessRevokedFromDoctor(address Patient, address Doctor);
    event AccessRevokedFromPharmacy(address Patient, address Pharmacy);
    event PatientRecordModified(address Patient, address ModifiedBy);
    event RevokeUser(address user, AccessControls);

    modifier isValid(address _addr) {
        if (allowAccess[_addr] == AccessControls.Patient)
            revert AlreadyRegisteredAsPatient();
        if (allowAccess[_addr] == AccessControls.Doctor)
            revert AlreadyRegisteredAsDoctor();
        if (allowAccess[_addr] == AccessControls.Pharmacy)
            revert AlreadyRegisteredAsPharmacy();
        _;
    }

    modifier isOutOfRangeAccessControls(uint8 role) {
        if (role > uint8(AccessControls.Pharmacy)) revert UnauthorizedRole();
        _;
    }
    modifier isPatient(address _addr) {
        if (allowAccess[_addr] != AccessControls.Patient)
            revert NotRegisteredAsPatient();
        _;
    }
    modifier OwnerOrPatient(address _addr) {
        require(
            _addr == owner() || allowAccess[_addr] == AccessControls.Patient,
            "Unauthorized users"
        );
        _;
    }
    modifier OwnerOrPatientOrDoctor(address _addr) {
        require(
            _addr == owner() ||
                allowAccess[_addr] == AccessControls.Patient ||
                allowAccess[msg.sender] == AccessControls.Doctor,
            "Unauthorized users"
        );
        _;
    }
    modifier isDoctor(address _addr) {
        if (allowAccess[_addr] != AccessControls.Doctor)
            revert NotRegisteredAsDoctor();
        _;
    }
    modifier isPharmacy(address _addr) {
        if (allowAccess[_addr] != AccessControls.Pharmacy)
            revert NotRegisteredAsPharmacy();
        _;
    }

    function authorizeUser(
        address _addr,
        uint8 role
    ) public onlyOwner isValid(_addr) isOutOfRangeAccessControls(role) {
        allowAccess[_addr] = AccessControls(role);
    }

    function revokeUser(address _addr) public onlyOwner {
        require(
            allowAccess[_addr] != AccessControls.Unauthorized,
            "Not Registered"
        );
        if (allowAccess[_addr] == AccessControls.Patient) {
            // PatientRecord memory patient;
            // for (uint i = 0; i < patientRecords.length; i++) {
            //     if (patientRecords[i].addr == _addr) {
            //         patient = patientRecords[i];
            //         patientRecords[i] = patientRecords[
            //             patientRecords.length - 1
            //         ];
            //         patientRecords[patientRecords.length - 1] = patient;
            //     }
            // }
            // patientRecords.pop();
            delete patientRecordDetails[_addr];
        }
        if (allowAccess[_addr] == AccessControls.Doctor) {
            // DoctorRecord memory doctor;
            // for (uint i = 0; i < doctorRecords.length; i++) {
            //     if (doctorRecords[i].addr == _addr) {
            //         doctor = doctorRecords[i];
            //         doctorRecords[i] = doctorRecords[doctorRecords.length - 1];
            //         doctorRecords[doctorRecords.length - 1] = doctor;
            //     }
            // }
            // doctorRecords.pop();
            delete doctorRecordDetails[_addr];
        }
        if (allowAccess[_addr] == AccessControls.Pharmacy) {
            // PharmacyRecord memory pharmacy;
            // for (uint i = 0; i < pharmacyRecords.length; i++) {
            //     if (pharmacyRecords[i].addr == _addr) {
            //         pharmacy = pharmacyRecords[i];
            //         pharmacyRecords[i] = pharmacyRecords[
            //             pharmacyRecords.length - 1
            //         ];
            //         pharmacyRecords[pharmacyRecords.length - 1] = pharmacy;
            //     }
            // }
            // pharmacyRecords.pop();

            delete pharmacyRecordDetails[_addr];
        }
        emit RevokeUser(_addr, allowAccess[_addr]);
        allowAccess[_addr] = AccessControls.Unauthorized;
    }

    function isRegistered() public view returns (string memory status) {
        if (allowAccess[msg.sender] == AccessControls.Unauthorized)
            return "Not Registered";
        if (allowAccess[msg.sender] == AccessControls.Patient)
            return "Registered as Patient";
        if (allowAccess[msg.sender] == AccessControls.Doctor)
            return "Registered as Doctor";
        if (allowAccess[msg.sender] == AccessControls.Pharmacy)
            return "Registered as Pharmacy";
    }

    function addPatientRecord(
        string memory name,
        uint age,
        string memory gender,
        string memory bloodGroup
    ) public isPatient(msg.sender) {
        PatientRecord memory patient = PatientRecord(
            name,
            age,
            gender,
            bloodGroup,
            msg.sender,
            block.timestamp,
            msg.sender,
            address(0),
            ""
        );
        patientRecords.push(patient);
        patientRecordDetails[msg.sender] = patient;
        emit PatientRecordsAdded(msg.sender);
    }

    function getPatientRecord()
        public
        view
        isPatient(msg.sender)
        returns (PatientRecord memory)
    {
        return patientRecordDetails[msg.sender];
    }

    function addDoctorRecord(
        string memory name,
        uint age,
        string memory gender,
        string memory Qualification,
        string memory HospitalName,
        string memory location
    ) public isDoctor(msg.sender) {
        DoctorRecord memory doctor = DoctorRecord(
            name,
            age,
            gender,
            Qualification,
            HospitalName,
            location,
            msg.sender
        );
        doctorRecords.push(doctor);
        doctorRecordDetails[msg.sender] = doctor;
        emit DoctorRecordsAdded(msg.sender);
    }

    // function getDoctorRecord() public isDoctor(msg.sender) view returns(DoctorRecord memory){
    //   return doctorRecordDetails[msg.sender];
    // }

    function addPharmacyRecord(
        string memory name,
        string memory street,
        string memory location
    ) public isPharmacy(msg.sender) {
        PharmacyRecord memory Pharmacy = PharmacyRecord(
            name,
            street,
            location,
            msg.sender
        );
        pharmacyRecords.push(Pharmacy);
        pharmacyRecordDetails[msg.sender] = Pharmacy;
        emit PharmacyRecordsAdded(msg.sender);
    }

    // function getPharmacyRecord() public isPharmacy(msg.sender) view returns(PharmacyRecord memory){
    //   return pharmacyRecordDetails[msg.sender];
    // }
    function getAllPatientRecords()
        public
        view
        onlyOwner
        returns (PatientRecord[] memory)
    {
        return patientRecords;
    }

    function getAllDoctorRecords()
        public
        view
        OwnerOrPatient(msg.sender)
        returns (DoctorRecord[] memory)
    {
        return doctorRecords;
    }

    function getAllPharmacyRecords()
        public
        view
        OwnerOrPatientOrDoctor(msg.sender)
        returns (PharmacyRecord[] memory)
    {
        return pharmacyRecords;
    }

    function allowAccessToDoctor(address _doctor) public isPatient(msg.sender) {
        require(
            allowAccess[_doctor] == AccessControls.Doctor,
            "Not Registered as Doctor"
        );
        hasAccessToDoctor[_doctor][msg.sender] = true;
        emit AccessGrantedToDoctor(msg.sender, _doctor);
    }

    function revokeAccessToDoctor(
        address _doctor
    ) public isPatient(msg.sender) {
        require(
            allowAccess[_doctor] == AccessControls.Doctor,
            "Not Registered as Doctor"
        );
        hasAccessToDoctor[_doctor][msg.sender] = false;
        emit AccessRevokedFromDoctor(msg.sender, _doctor);
    }

    function allowAccessToPharmacy() public isPatient(msg.sender) {
        address _Pharmacy = patientRecordDetails[msg.sender].pharmacy;
        require(
            allowAccess[_Pharmacy] == AccessControls.Pharmacy,
            "Not Registered as Pharmacy"
        );
        hasAccessToPharmacy[_Pharmacy][msg.sender] = true;
        emit AccessGrantedToPharmacy(msg.sender, _Pharmacy);
    }

    function revokeAccessToPharmacy() public isPatient(msg.sender) {
        address _Pharmacy = patientRecordDetails[msg.sender].pharmacy;
        require(
            allowAccess[_Pharmacy] == AccessControls.Pharmacy,
            "Not Registered as Pharmacy"
        );
        hasAccessToPharmacy[_Pharmacy][msg.sender] = false;
        emit AccessRevokedFromPharmacy(msg.sender, _Pharmacy);
    }

    function getPatientsOfDoctors()
        public
        view
        isDoctor(msg.sender)
        returns (PatientRecord[] memory records)
    {
        uint256 resultCount;
        for (uint i = 0; i < patientRecords.length; i++) {
            if (hasAccessToDoctor[msg.sender][patientRecords[i].addr]) {
                resultCount++;
            }
        }
        records = new PatientRecord[](resultCount);
        uint256 j;
        for (uint i = 0; i < patientRecords.length; i++) {
            if (hasAccessToDoctor[msg.sender][patientRecords[i].addr]) {
                records[j] = patientRecords[i];
                j++;
            }
        }
    }

    function getPatientsOfPharmacy()
        public
        view
        isPharmacy(msg.sender)
        returns (PatientRecord[] memory records)
    {
        uint256 resultCount;
        for (uint i = 0; i < patientRecords.length; i++) {
            if (hasAccessToPharmacy[msg.sender][patientRecords[i].addr]) {
                resultCount++;
            }
        }
        records = new PatientRecord[](resultCount);
        uint256 j;
        for (uint i = 0; i < patientRecords.length; i++) {
            if (hasAccessToPharmacy[msg.sender][patientRecords[i].addr]) {
                records[j] = patientRecords[i];
                j++;
            }
        }
    }

    function modifyPatientRecord(
        address _addr,
        address _pharmacy,
        string memory _desc
    ) public isDoctor(msg.sender) isPharmacy(_pharmacy) isPatient(_addr) {
        if (!hasAccessToDoctor[msg.sender][_addr]) revert UnauthorizedDoctor();
        PatientRecord memory patient = PatientRecord(
            patientRecordDetails[_addr].name,
            patientRecordDetails[_addr].age,
            patientRecordDetails[_addr].gender,
            patientRecordDetails[_addr].bloodGroup,
            patientRecordDetails[_addr].addr,
            block.timestamp,
            msg.sender,
            _pharmacy,
            _desc
        );
        patientRecordDetails[_addr] = patient;
        emit PatientRecordModified(_addr, msg.sender);
    }
}
