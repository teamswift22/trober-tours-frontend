"use client";

// pages/dashboard.tsx
import "./page.css";
import { ReactElement, useMemo } from "react";
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
import Image from "next/image";
import ClientLayout from "@/components/ClientLayout";

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

const CardComponent = ({
  icon,
  value,
}: {
  icon: ReactElement;
  value: string | number;
}) => {
  return (
    <div className="flex  items-center gap-2 bg-white h-9 px-2 2xl:px-6 rounded-md min-w-16 md:w-auto">
      <div className="text-[#FA7454] text-xl">{icon}</div>
      <p className="text-sm font-light">{value}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { data: allTours } = useGetToursQuery({ params: "", filterQuery: "" });

  const upcomingTour = useMemo(() => allTours?.tours[0], [allTours]);

  const selectCategoryIcon = (category: string) => {
    switch (category) {
      case "adventure":
        return "/adventure.png";
      case "leisure":
        return "/leisure.png";
      case "games":
        return "/games.png";
      default:
        return "/games.png";
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="flex flex-col justify-center md:flex-row gap-10">
        <div className="w-full xl:w-9/12 flex flex-col gap-12">
          <div className="p-5 flex items-center xl:p-10 rounded-xl custom-background min-h-[300px]">
            <div className="w-full">
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-[#FB9A83]">Upcoming Tour</p>
                {upcomingTour && (
                  <button
                    className="text-sm text-white bg-[#FB9A83] px-3 py-3 md:px-8 md:py-4 rounded-md"
                    onClick={() =>
                      router.push(`/app/tours/${upcomingTour._id}`)
                    }
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
                  <div className="flex items-center flex-wrap gap-2 xl:gap-4">
                    <CardComponent
                      icon={<PiCalendarCheck />}
                      value={formatDateToCustomFormat(upcomingTour?.startDate)}
                    />
                    <CardComponent
                      value={upcomingTour?.price}
                      icon={<p className=" text-[#FA7454] font-light">₵</p>}
                    />
                    <CardComponent icon={<HiOutlineUser />} value={"10 / 20"} />
                    <CardComponent
                      icon={<TfiLocationPin />}
                      value={upcomingTour?.destination?.name}
                    />
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
                <Link href="/app/tours">
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
                        router.push("/app/tours/createtour?step=Tour Details")
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
                        key={tour._id}
                        className="grid grid-cols-4 items-center p-3 md:p-4 bg-white rounded-xl hover: cursor-pointer"
                        role="button"
                        onClick={() => router.push(`/app/tours/${tour._id}`)}
                      >
                        <div className="flex col-span-2 gap-2 md:gap-6">
                          <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#FEEBE6]">
                            <Image
                              src={selectCategoryIcon(tour?.category)}
                              alt=""
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="font-light md:text-base text-sm truncate">
                              {tour?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-light md:text-base text-sm">
                            {tour?.price == 0
                              ? "Free Event"
                              : `₵ ${tour?.price}` || "Price N/A"}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="font-light md:text-base text-sm">
                            {formatDateToCustomFormat(tour?.startDate)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full md:w-5/12 flex flex-col gap-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <h3 className="text-xl font-semibold mb-10">Todo list</h3>
            <ScrollArea className="h-[500px] overflow-auto">
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
        </div> */}
      </div>
    </>
  );
};

// function renderPrioritySpan(priority: String) {
//   switch (priority) {
//     case "High":
//       return (
//         <span className="bg-[#E73856] px-2 py-1 rounded-full text-sm text-white">
//           {priority}
//         </span>
//       );
//     case "Medium":
//       return (
//         <span className="bg-[#FDC3B5] px-2 py-1 rounded-full text-sm text-white">
//           {priority}
//         </span>
//       );
//     case "Low":
//       return (
//         <span className="bg-[#828282] px-2 py-1 rounded-full text-sm text-white">
//           {priority}
//         </span>
//       );
//     default:
//       return (
//         <span className="bg-gray-500 px-2 py-1 rounded-full text-sm text-white">
//           {priority}
//         </span>
//       );
//   }
// }

const DashboardPage = () => {
  // return <Layout title="Dashboard" rightContent={<Dashboard />} />;
  return <Dashboard />;
};

export default DashboardPage;
