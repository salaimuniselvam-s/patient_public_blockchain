import React, { useState } from "react";
import { Card } from "antd";
const PharmaInfoContainer = ({ name, street, location, addr }) => {
  return (
    <>
      <Card className="bg-slate-300  w-full mt-3 ">
        <div className="flex  justify-evenly">
          <div className="flex  flex-col mr-6">
            <label>
              <span>Name : </span>
              <span className=" font-semibold text-lg">{name}</span>
            </label>
            <label>
              <span>Street :</span>
              <span className=" font-semibold text-lg">{street}</span>
            </label>
            <label>
              <span>Address : </span>
              <span className=" font-semibold text-lg">{addr}</span>
            </label>
            <label>
              <span>Location : </span>
              <span className=" font-semibold text-lg">{location}</span>
            </label>
          </div>
        </div>
      </Card>
    </>
  );
};

export default PharmaInfoContainer;