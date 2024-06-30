"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { BsGlobe } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { HiOutlineUser, HiOutlineUserCircle } from "react-icons/hi";
import { IoAdd, IoSettingsOutline } from "react-icons/io5";
import { useGetAgencyMemberQuery } from "@/lib/features/agency-member/agencyMemeberSlice";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useLogoutMutation } from "@/lib/features/auth/authApiSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navbarItems = [
  { logo: <GoHome />, name: "Home", path: "/" },
  { logo: <BsGlobe />, name: "All Tours", path: "tours" },
  {
    logo: <HiOutlineUser />,
    name: "Participants",
    path: "participants",
  },
  { logo: <HiOutlineUserCircle />, name: "Team", path: "team" },
  {
    logo: <IoSettingsOutline />,
    name: "Settings",
    path: "settings",
  },
];

interface LinkComponentsProps {
  name: string;
  icon?: React.ReactNode;
  link: string;
}
function MobileLinkComponent({ icon, link }: LinkComponentsProps) {
  const pathName = usePathname();

  const isCurrentPath = (path: string) => {
    const pathSegments = pathName.split("/");
    const routeName = pathSegments[2] || "/";
    return routeName == path;
  };

  return (
    <Link
      className={`flex flex-col items-center justify-center text-2xl ${
        !isCurrentPath(link)
          ? "text-gray-500 hover:text-gray-900 "
          : "  text-[#FA7454] transition-all hover:text-[#FA7454] "
      }`}
      href={`/app/${link}`}
    >
      {icon}
    </Link>
  );
}

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const { data: userData } = useGetAgencyMemberQuery("");
  const [removeCookieSession] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const isCurrentPath = (path: string) => {
    const pathSegments = pathName.split("/");
    const routeName = pathSegments[2] || "/";
    console.log(routeName);
    console.log(path);
    return routeName == path;
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
    <div className="grid h-screen w-full grid-cols-1 bg-[#E8F6FD] xl:grid-cols-[280px_1fr]">
      <aside className={`hidden xl:flex flex-col justify-between bg-[#0F6E98]`}>
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
              href={"/app/" + item.path}
            >
              <div className="text-xl">{item.logo}</div>
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
      <div className="w-full">
        <div className="bg-white flex  justify-between items-center px-2 xl:px-10 h-20">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              Hello {userData?.fullName?.split(" ")[0] || "Anon"}!
            </h1>
            <p className="text-[#828282] text-xs md:text-base font-extralight">
              Welcome back and create new tours
            </p>
          </div>
          {/* Profile image */}
          <div className="flex items-center gap-x-2">
            <div className="hidden md:flex justify-end">
              {/* New Tour button */}
              <Link
                href="/app/tours/createtour?step=Tour Details"
                className="flex text-sm text-white bg-[#FA7454] md:px-6 md:py-2 rounded-md items-center gap-2"
              >
                <IoAdd size={24} />
                <p className="hidden md:block">New Tour</p>
              </Link>
            </div>
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback>{intials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="h-[calc(100vh-134px)] overflow-auto xl:h-[calc(100vh-80px)] px-5  md:px-10 py-5 ">
          {children}
        </div>
        <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-primary-foreground  shadow-lg">
          <div className="flex items-center justify-around h-14">
            {navbarItems?.map((item) => (
              <MobileLinkComponent
                name={item.name}
                key={item.name}
                icon={item?.logo}
                link={item?.path}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
