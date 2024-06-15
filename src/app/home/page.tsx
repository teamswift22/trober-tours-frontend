"use client";

// pages/dashboard.tsx
import "./page.css";
import { useMemo } from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import { useRouter } from "next/navigation";
import { HiOutlineUser } from "react-icons/hi2";
import { PiCalendarCheck } from "react-icons/pi";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { useGetToursQuery } from "@/lib/features/tours/toursApiSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDateToCustomFormat } from "@/lib/utils";
import Link from "next/link";

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
    description: "Send a message to your participants",
    completed: false,
    priority: "Low",
  },
  {
    id: 5,
    text: "Send notification",
    description: "Send a message to your participants",
    completed: false,
    priority: "Low",
  },
  {
    id: 6,
    text: "Send notification",
    description: "Send a message to your participants",
    completed: false,
    priority: "Low",
  },
];

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { data: allTours } = useGetToursQuery("");

  const upcomingTour = useMemo(() => allTours?.tours[0], [allTours]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className=" p-4 md:px-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-7/12 flex flex-col gap-12">
          <div className="p-10 rounded-xl custom-background min-h-[300px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-[#FB9A83]">Upcoming Tour</p>
                {upcomingTour && (
                  <button
                    className="text-sm text-white bg-[#FB9A83] px-8 py-4 rounded-md"
                    onClick={() => router.push(`/tours/${upcomingTour._id}`)}
                  >
                    View Details
                  </button>
                )}
              </div>
              {upcomingTour ? (
                <div>
                  <p className="text-3xl mb-2 text-white">
                    {upcomingTour?.name}
                  </p>
                  <p className="text-xs mb-4 font-thin text-white md:w-4/6 max-w-[436px] line-clamp-2">
                    {upcomingTour?.description}...
                  </p>
                  <div className="flex flex-col items-center md:flex-row gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 bg-white py-2 px-2 2xl:px-6 rounded-md min-w-1/2 w-1/2 md:w-auto">
                      <PiCalendarCheck color="FA7454" size={20} />
                      <p className="text-sm font-light">
                        {formatDateToCustomFormat(upcomingTour?.startDate)}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 bg-white py-2 px-2 2xl:px-6 rounded-md min-w-1/2 w-1/2 md:w-auto">
                      <MdOutlineAttachMoney color="FA7454" size={20} />
                      <p className="text-sm font-light">
                        Ghc. {upcomingTour?.price}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 bg-white py-2 px-2 2xl:px-6 rounded-md min-w-1/2 w-1/2 md:w-auto">
                      <HiOutlineUser color="FA7454" size={20} />
                      <p className="text-sm font-light">10/20</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2 bg-white py-2 px-2 2xl:px-6 rounded-md min-w-1/2 w-1/2 md:w-auto">
                      <TfiLocationPin color="FA7454" size={20} />
                      <p className="text-sm font-light">
                        {upcomingTour?.destination?.formatted_address}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-3xl mb-2 text-white">
                  Your Upcoming Tour will show up here
                </div>
              )}
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-row justify-between mb-6">
                <p className="text-xl font-medium">All tours</p>
                <Link href="/tours">
                  <p className="text-[#828282] hover: cursor-pointer">
                    See All
                  </p>
                </Link>
              </div>
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                {allTours?.tours.length < 1 ? (
                  <div className="flex justify-around items-center flex-col h-[200px]">
                    <p className="text-[#828282]">
                      Your created Tours will show up here
                    </p>
                    <button
                      className="flex text-sm text-white bg-[#FA7454] px-14 py-4 rounded-md items-center gap-5"
                      onClick={() =>
                        router.push("/tours/createtour?step=Tour Details")
                      }
                    >
                      <IoAdd size={24} />
                      <p>Create Tour</p>
                    </button>
                  </div>
                ) : (
                  allTours?.tours?.map((tour: any) => {
                    return (
                      <div
                        key={tour.id}
                        className="grid grid-cols-4 items-center p-4 bg-white rounded-xl hover: cursor-pointer"
                      >
                        <div className="flex col-span-2 gap-2 md:gap-6">
                          <div className="h-12 w-12 rounded-xl bg-orange-200" />
                          <div className="flex flex-col">
                            <p className="font-light">{tour?.name}</p>
                            <p className="text-[#BDBDBD] font-light">
                              Tour Name
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-light">
                            {tour?.price || "Price N/A"}
                          </p>
                          <p className="text-[#BDBDBD] font-light">Price</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-light">
                            {formatDateToCustomFormat(tour?.startDate)}
                          </p>
                          <p className="text-[#BDBDBD] font-light">Date</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-5/12 flex flex-col gap-20">
          <div className="flex justify-end">
            {/* New Tour button */}
            <button
              className="flex text-sm text-white bg-[#FA7454] px-14 py-4 rounded-md items-center gap-5"
              onClick={() => router.push("/tours/createtour?step=Tour Details")}
            >
              <IoAdd size={24} />
              <p>New Tour</p>
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <h3 className="text-xl font-semibold mb-10">Todo list</h3>
            <ScrollArea className="h-[500px] overflow-auto">
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
            </ScrollArea>
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
