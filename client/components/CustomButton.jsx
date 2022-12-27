import React from "react";

const CustomButton = ({ title, handleClick, restStyles }) => (
  <button
    type="button"
    className={`px-4 py-1 rounded-lg bg-blue-600 w-fit text-white  font-bold ${restStyles}`}
    onClick={handleClick}
  >
    {title}
  </button>
);

export default CustomButton;
