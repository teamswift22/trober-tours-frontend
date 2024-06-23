"use client";
import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { GoHome } from "react-icons/go";
import { BsGlobe } from "react-icons/bs";
import { HiOutlineUser, HiOutlineUserCircle } from "react-icons/hi";
import { IoAdd, IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useGetAgencyMemberQuery } from "@/lib/features/agency-member/agencyMemeberSlice";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useLogoutMutation } from "@/lib/features/auth/authApiSlice";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Layout = ({
  title,
  rightContent,
}: {
  title: string;
  rightContent: React.ReactNode;
}) => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: userData } = useGetAgencyMemberQuery("");
  const [removeCookieSession] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const navbarItems = [
    { logo: <GoHome size={20} />, name: "Home", path: "home" },
    { logo: <BsGlobe size={20} />, name: "All Tours", path: "tours" },
    {
      logo: <HiOutlineUser size={20} />,
      name: "Participants",
      path: "participants",
    },
    { logo: <HiOutlineUserCircle size={20} />, name: "Team", path: "team" },
    {
      logo: <IoSettingsOutline size={20} />,
      name: "Settings",
      path: "settings",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isCurrentPath = (path: string) => {
    const pathSegments = pathName.split("/");
    const routeName = pathSegments[1];
    return routeName === path;
  };

  const logoutuser = async () => {
    try {
      await removeCookieSession({}).unwrap();
      localStorage.removeItem("persistedData");
      dispatch(logout());
      window.location.href = "/";
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const intials = useMemo(() => {
    if (userData?.fullName) {
      const splitName = userData?.fullName?.split(" ");
      const firstInitial = splitName[0]?.split("")[0];
      const secondInitial = splitName[splitName.length - 1]?.split("")[0];
      return firstInitial + secondInitial;
    }
  }, [userData]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>{title}</title>
      </Head>

      <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:flex flex-col justify-between md:w-64 bg-[#0F6E98] max-h-screen md:fixed md:h-screen`}
        >
          <div>
            <div className="flex flex-row items-center my-8 px-4">
              <img
                src="/logo.png"
                alt="Trober Logo"
                className="mr-2 h-10 md:h-16 lg:h-20"
              />
              <p className="text-4xl text-white font-extrabold">Trober</p>
            </div>
            {navbarItems.map((item, index) => (
              <Link
                key={index}
                className={`${
                  isCurrentPath(item.path) ? "bg-[#FA7454]" : "transparent"
                } py-4 pl-10 text-white flex items-center gap-2 hover:cursor-pointer`}
                href={"/" + item.path}
              >
                {item.logo}
                <p className="text-sm">{item.name}</p>
              </Link>
            ))}
          </div>
          <div
            className="bg-white py-4 pl-10 text-[#0F6E98] flex items-center gap-2 hover:cursor-pointer"
            role="button"
            onClick={logoutuser}
          >
            <CiLogout size={20} />
            <p>Logout</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#E8F6FD] md:pl-64">
          <div className=" px-4 pt-3 md:p-6 md:px-10 bg-white fixed w-full md:w-[calc(100vw-256px)] z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-6 md:mb-0">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Hello {userData?.fullName?.split(" ")[0] || "Anon"}!
                </h1>
                <p className="text-[#828282] font-extralight">
                  Welcome back and create new tours
                </p>
              </div>
              {/* Profile image */}
              <div className="flex items-center gap-x-2">
                <div className="flex justify-end">
                  {/* New Tour button */}
                  <Link
                    href="/tours/createtour?step=Tour Details"
                    className="flex text-sm text-white bg-[#FA7454] px-6 py-2 rounded-md items-center gap-2"
                  >
                    <IoAdd size={24} />
                    <p>New Tour</p>
                  </Link>
                </div>
                <Avatar className="hidden md:block">
                  <AvatarImage src={""} />
                  <AvatarFallback>{intials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="mt-32 md:mt-16 md:pt-20 h-[calc(100vh-128px)] md:h-[calc(100vh-104px)] overflow-auto">
            {rightContent}
          </div>
        </main>

        {/* Button for toggling sidebar on mobile */}
        <button
          className="md:hidden fixed top-5 right-5 z-20"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <IoClose size={30} /> : <IoMdMenu size={30} />}
        </button>
      </div>
    </>
  );
};

export default Layout;
