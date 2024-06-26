"use client";
import React, { useState } from "react";

const NavBar = ({
  navArray,
  getActiveTab,
  activeTab,
  progessIndicator = false,
}: {
  navArray: Array<string>;
  getActiveTab: (tab: any) => void;
  activeTab: string;
  progessIndicator?: boolean;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  console.log(navArray.indexOf(activeTab));

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
        <div className="hidden md:flex md:flex-start bg-white gap-x-2 w-full">
          {navArray.map((navItem, index) => {
            return (
              <button
                key={index}
                className={`px-4 py-4 hover:cursor-pointer ${
                  navArray.indexOf(activeTab) > navArray.indexOf(navItem) &&
                  progessIndicator &&
                  "bg-[#82D0F3] text-white"
                } ${
                  activeTab === navItem
                    ? "bg-button-blue-bg text-white"
                    : "text-[#BDBDBD]"
                }`}
                onClick={() => {
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
