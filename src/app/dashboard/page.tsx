// pages/dashboard.tsx
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { HiOutlineUser } from "react-icons/hi2";
import { PiCalendarCheck } from "react-icons/pi";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import "./page.css";
import Layout from "@/components/layout";

const todos = [
  {
    id: 1,
    text: "Create Tour",
    description: "Start a new tour and invite members",
    completed: true,
    priority: "Medium",
  },
  {
    id: 2,
    text: "Add Co-admins",
    description: "Add admin's to share task",
    completed: false,
    priority: "Medium",
  },
  {
    id: 3,
    text: "Add Transportation",
    description: "Select transport for your trip",
    completed: false,
    priority: "High",
  },
  {
    id: 4,
    text: "Send notification",
    description: "Send a message to your subscribers",
    completed: false,
    priority: "Low",
  },
  {
    id: 5,
    text: "Send notification",
    description: "Send a message to your subscribers",
    completed: false,
    priority: "Low",
  },
  {
    id: 6,
    text: "Send notification",
    description: "Send a message to your subscribers",
    completed: false,
    priority: "Low",
  },
];

const tours = [
  { name: "Akosombo Easter", price: "54.00", date: "June 30" },
  { name: "Akosombo Easter", price: "54.00", date: "June 30" },
  { name: "Akosombo Easter", price: "54.00", date: "June 30" },
  { name: "Akosombo Easter", price: "54.00", date: "June 30" },
  { name: "Akosombo Easter", price: "54.00", date: "June 30" },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className=" p-4 md:px-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-7/12 flex flex-col gap-12">
          <div className="p-10 rounded-xl custom-background">
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-[#FB9A83]">Upcoming Tour</p>
                <button className="text-sm text-white bg-[#FB9A83] px-8 py-4 rounded-md">
                  View Details
                </button>
              </div>
              <div>
                <p className="text-3xl mb-2 text-white">Easter In Kwahu</p>
                <p className="text-xs mb-4 font-thin text-white md:w-4/6">
                  Discover the essence of the city with our immersive city tour
                  experience. Uncover hidden gems and iconic landmarks...
                </p>
                <div className="flex flex-col items-center md:flex-row gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-2 bg-white py-2 px-2 2xl:px-6 rounded-md min-w-1/2 w-1/2 md:w-auto">
                    <PiCalendarCheck color="FA7454" size={20} />
                    <p className="text-sm font-light">20th April</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-2 bg-white py-2 px-2 2xl:px-6 rounded-md min-w-1/2 w-1/2 md:w-auto">
                    <MdOutlineAttachMoney color="FA7454" size={20} />
                    <p className="text-sm font-light">Ghc. 200</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-2 bg-white py-2 px-2 2xl:px-6 rounded-md min-w-1/2 w-1/2 md:w-auto">
                    <HiOutlineUser color="FA7454" size={20} />
                    <p className="text-sm font-light">10/20</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-2 bg-white py-2 px-2 2xl:px-6 rounded-md min-w-1/2 w-1/2 md:w-auto">
                    <TfiLocationPin color="FA7454" size={20} />
                    <p className="text-sm font-light">Akosombo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-row justify-between mb-6">
                <p className="text-xl font-medium">All tours</p>
                <p className="text-[#828282] hover: cursor-pointer">See All</p>
              </div>
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                {tours.map((tour, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between p-4 bg-white rounded-xl hover: cursor-pointer"
                    >
                      <div className="flex md:gap-10">
                        <div className="h-12 w-12 rounded-xl bg-orange-200"></div>
                        <div className="flex flex-col">
                          <p className="font-light">{tour.name}</p>
                          <p className="text-[#BDBDBD] font-light">Tour Name</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-light">${tour.price}</p>
                        <p className="text-[#BDBDBD] font-light">Price</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-light">{tour.date}</p>
                        <p className="text-[#BDBDBD] font-light">Date</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-5/12 flex flex-col gap-20">
          <div className="flex justify-end">
            {/* New Tour button */}
            <button className="flex text-sm text-white bg-[#FA7454] px-14 py-4 rounded-md items-center gap-5">
              <IoAdd size={24} />
              <p>New Tour</p>
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <h3 className="text-xl font-semibold mb-10">Todo list</h3>
            <div className="max-h-[300px] overflow-auto">
              {/* Todo items */}
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between mb-6"
                >
                  <div className="flex items-center">
                    {todo.completed ? (
                      <FiCheckSquare
                        size={20}
                        className="text-green-500 mr-4 hover: cursor-pointer"
                      />
                    ) : (
                      <FiSquare
                        size={20}
                        className="mr-4 hover: cursor-pointer"
                      />
                    )}
                    <div>
                      <p className="">{todo.text}</p>
                      <p className="text-gray-500 text-sm font-light">
                        {todo.description}
                      </p>
                    </div>
                  </div>

                  {renderPrioritySpan(todo.priority)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function renderPrioritySpan(priority: String) {
  switch (priority) {
    case "High":
      return (
        <span className="bg-[#E73856] px-2 py-1 rounded-full text-sm text-white">
          {priority}
        </span>
      );
    case "Medium":
      return (
        <span className="bg-[#FDC3B5] px-2 py-1 rounded-full text-sm text-white">
          {priority}
        </span>
      );
    case "Low":
      return (
        <span className="bg-[#828282] px-2 py-1 rounded-full text-sm text-white">
          {priority}
        </span>
      );
    default:
      return (
        <span className="bg-gray-500 px-2 py-1 rounded-full text-sm text-white">
          {priority}
        </span>
      );
  }
}

const DashboardPage = () => {
  return <Layout title="Dashboard" rightContent={<Dashboard />} />;
};

export default DashboardPage;
