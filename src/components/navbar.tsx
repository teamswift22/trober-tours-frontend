"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const NavBar = ({
  navArray,
  getActiveTab,
}: {
  navArray: Array<string>;
  getActiveTab: (tab: any) => void;
}) => {
  const router = useRouter();
  const query = useSearchParams();
  const activeTab = query.get("step");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white mb-4 px-2">
      <nav className="flex justify-between items-center">
        <div className="flex">
          <button
            className="text-[#BDBDBD] md:hidden mr-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <span className="text-lg font-bold md:hidden">{activeTab}</span>
        </div>
        <div className="hidden md:flex md:flex-start w-full">
          {navArray.map((navItem, index) => {
            return (
              <button
                key={index}
                className={`px-4 py-4 hover:cursor-pointer ${
                  activeTab === navItem
                    ? "bg-button-blue-bg text-white"
                    : "text-[#BDBDBD]"
                }`}
                onClick={() => {
                  router.push(`?step=${navItem}`);
                  getActiveTab && getActiveTab(navItem);
                }}
              >
                {navItem}
              </button>
            );
          })}
        </div>
      </nav>
      {showMenu && (
        <div className="md:hidden">
          {navArray.map((navItem, index) => {
            return (
              <button
                key={index}
                className={`block w-full px-4 py-4 hover:cursor-pointer border-b border-gray-200 ${
                  activeTab === navItem
                    ? "bg-button-blue-bg text-white"
                    : "text-[#BDBDBD]"
                }`}
                onClick={() => {
                  router.push(`?step=${navItem}`);
                  getActiveTab && getActiveTab(navItem);
                  setShowMenu(false);
                }}
              >
                {navItem}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavBar;
