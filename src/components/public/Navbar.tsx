import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full px-5 lg:px-0 py-5 font-sora ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Image src="/logo.png" width={50} height={50} alt="Logo" />
          <h2 className="text-[#00618F] font-bold font-sora text-4xl">
            Trober
          </h2>
        </div>
        <div className="flex items-center gap-x-3 lg:gap-x-8">
          <div className="bg-[#E8EDF5] md:flex items-center hidden text-[#4A789C] pr-1 pl-4 py-2 rounded-lg">
            <Search />
            <input
              type="search"
              className="bg-transparent placeholder:text-[#4A789C] pl-2"
              placeholder="Search"
            />
          </div>
          <Button className="bg-[#FA7454] text-white hover:bg-[#FA7454] hover:opacity-70">
            Create a tour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
