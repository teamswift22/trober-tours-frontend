"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Filter from "./Filter";

const TabFilter = ({ name }: { name: string }) => {
  const query = useSearchParams();
  const router = useRouter();
  // bg - [#E8EDF5];
  return (
    <button
      onClick={() => router.push(`?category=${name}`)}
      className={`${
        query.get("category") === name ? "bg-[#53BFEE]" : "bg-[#E8EDF5] "
      } rounded-2xl text-black px-3 py-1`}
    >
      {name}
    </button>
  );
};
const TourView = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 py-5">
      <div className="w-full bg-[#E8EDF5] flex items-center p-1 pl-5 rounded-md text-[#4A789C]">
        <Search />
        <input
          type="search"
          className="bg-transparent placeholder:text-[#4A789C] w-full p-2 outline-none"
          placeholder="Search by location, date, or interest"
        />
      </div>
      <div className="my-4 flex items-center flex-wrap gap-2 lg:gap-4">
        <TabFilter name="Explore" />
        <TabFilter name="Adventure" />
        <TabFilter name="Relax" />
        <TabFilter name="Culture" />
        <TabFilter name="Friendship" />
      </div>
      <div className="grid grid-cols-5 w-full gap-x-4 py-7 ">
        <p className="col-start-2 col-end-5 text-2xl font-bold">
          Available group tours
        </p>
      </div>
      <div className="grid grid-cols-5 w-full gap-x-4 ">
        <Filter />
        <div className="bg-red-500 col-span-4 grid grid-cols-4 gap-x-4">
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </div>
      </div>
    </div>
  );
};

export default TourView;
