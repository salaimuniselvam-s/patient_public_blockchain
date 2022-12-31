import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context";
import { Owner } from "../utils/ContractEnum";

const Header = () => {
  const { pathname } = useRouter();
  const highlightNavBar = `bg-slate-700`;
  const { chainId, user, walletAddress, setErrorMessage, setUser, contract } =
    useGlobalContext();
  useEffect(() => {
    const updateUser = async () => {
      try {
        const registered = await contract.isRegistered();
        setUser(registered);
      } catch (error) {
        console.error(error);
        setErrorMessage(error);
      }
    };
    if (contract && walletAddress) updateUser();
  }, [contract, walletAddress]);

  return (
    <div>
      <nav className=" bg-gradient-to-tl  from-slate-300  to-slate-700 py-2 md:py-4">
        <div className="container lg:px-4 md:px-1 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-bold text-xl text-white">
              Patient Record
            </Link>
            <button
              className="border border-solid border-gray-600 px-3 py-1 rounded text-white opacity-50 hover:opacity-75 md:hidden"
              id="navbar-toggle"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
            id="navbar-collapse"
          >
            {/* Owners Header */}
            {walletAddress.toString().toLowerCase() ==
              Owner(chainId).toLowerCase() && (
              <>
                <Link
                  href="/AllPatients"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors ${
                    pathname == `/AllPatients` && highlightNavBar
                  } duration-300 `}
                >
                  Patients
                </Link>
                <Link
                  href="/AllDoctors"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ${
                    pathname == `/AllDoctors` && highlightNavBar
                  } `}
                >
                  Doctors
                </Link>
                <Link
                  href="/AllPharmas"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ${
                    pathname == `/AllPharmas` && highlightNavBar
                  } `}
                >
                  Pharmas
                </Link>
              </>
            )}
            {/* Patients Header */}
            {user == 1 && (
              <>
                <Link
                  href="/MyRecords"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors ${
                    pathname == `/MyRecords` && highlightNavBar
                  } duration-300 `}
                >
                  My Records
                </Link>
                <Link
                  href="/Doctors"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ${
                    pathname == `/Doctors` && highlightNavBar
                  }`}
                >
                  Doctors
                </Link>
                <Link
                  href="/Pharma"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ${
                    pathname == `/Pharma` && highlightNavBar
                  }`}
                >
                  Pharma
                </Link>
              </>
            )}
            {/* Doctor Header */}
            {user == 2 && (
              <>
                <Link
                  href="/DoctorDetails"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ${
                    pathname == `/DoctorDetails` && highlightNavBar
                  }`}
                >
                  My Details
                </Link>
                <Link
                  href="/Patients"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ${
                    pathname == `/Patients` && highlightNavBar
                  }`}
                >
                  Patients
                </Link>
                <Link
                  href="/Pharma"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ${
                    pathname == `/Pharma` && highlightNavBar
                  }`}
                >
                  Pharma
                </Link>
              </>
            )}
            {/* Pharmacy Header */}
            {user == 3 && (
              <>
                <Link
                  href="/MyPharma"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ${
                    pathname == `/MyPharma` && highlightNavBar
                  }`}
                >
                  My Records
                </Link>
                <Link
                  href="/PharmaPatients"
                  className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 ${
                    pathname == `/PharmaPatients` && highlightNavBar
                  }`}
                >
                  Patients
                </Link>
              </>
            )}
            <div
              className={`p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 `}
            >
              {walletAddress}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
