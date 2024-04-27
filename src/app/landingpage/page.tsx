import React from "react";
import Link from "next/link";
import Image from "next/image";

// Assuming you have these images in your src/assets directory
import logo from "./assets/logo.png";
import backgroundImage from "../../public/LandingPageImage.png";
import LeftRightLayout from "@/components/LeftRightComponent";

const rightContent = (
  <div className="flex flex-col justify-center items-center h-full">
    <div className="text-center text-white p-4 z-10 flex flex-col justify-between flex-1 py-20 items-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#1E4355] font-bold">
        Get started
      </h1>
      <div className="w-full md:w-5/6 lg:w-4/6 xl:w-3/6 font-semibold">
        <p className="mt-4 text-lg md:text-xl lg:text-2xl text-[#7C8B9D]">
          Start building your tours or Join a created tour as an individual
        </p>
        <div className="mt-8 flex flex-col font-light">
          <Link href="signup">
            <button className="bg-button-blue-bg text-white py-3 rounded shadow-lg hover:bg-blue-600 w-full mb-4 md:mb-6 hover:cursor-pointer">
              Travel Company
            </button>
          </Link>
          <Link href="waitlist">
            <button className="bg-[#FA7454] text-white py-3 rounded shadow-lg hover:bg-orange-600 w-full hover:cursor-pointer">
              Individual
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center mt-8">
        <img
          src="/logo.png"
          alt="Trober Logo"
          className="mr-4 h-12 md:h-16 lg:h-20"
        />
        <p className="text-4xl md:text-5xl lg:text-6xl text-[#1E4355] font-extrabold">
          Trober
        </p>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <LeftRightLayout
      leftImage={"/LandingPageImage.png"}
      rightContent={rightContent}
    />
  );
};

export default LandingPage;
