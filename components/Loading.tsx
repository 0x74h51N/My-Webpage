"use client";
import React from "react";
import { Hourglass } from "react-loader-spinner";

const LoadingComponent = () => {
  return (
    <>
      <div className="absolute loading-container top-1/2 left-1/2">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["white", "#CFCFCF"]}
        />
        <p className=" text-stone-200">Loading...</p>
      </div>
    </>
  );
};

export default LoadingComponent;
