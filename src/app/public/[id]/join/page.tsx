import { Share2 } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 py-5">
      <div className="flex flex-col gap-y-4 lg:flex-row items-start justify-between">
        <div className="space-y-3">
          <h4 className="font-bold font-sora text-xl md:text-3xl text-[#1D1D1D]">
            Akosombo Safari and Boat Cruise Private Tour
          </h4>
          <p className="text-sm text-[#112211]">By Mainstream Tours</p>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="p-3 bg-secondary rounded-md text-primary-foreground font-medium">
            GHC 1,000
          </div>
          <button className="bg-secondary text-white p-3 rounded-md ">
            <Share2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
