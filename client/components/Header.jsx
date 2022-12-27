import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useGlobalContext } from "../context";

const Header = () => {
  const { pathname } = useRouter();
  const { walletAddress } = useGlobalContext();
  return (
    <div>
      <nav className="bg-stone-800 py-2 md:py-4">
        <div className="container px-4 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-bold text-xl text-white">
              Patient Record - Block Chain
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
            <div
              href="/"
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
