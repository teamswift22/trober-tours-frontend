"use client";
import Layout from "@/components/layout";
import React, { SetStateAction, useState, useRef } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { PiCalendarCheck } from "react-icons/pi";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import ImageScrollContainer from "@/components/ImageScrollComponent";
import { useGetTourQuery } from "@/lib/features/tours/toursApiSlice";
import { formatDateToCustomFormat } from "@/lib/utils";
import Link from "next/link";

const tourImages = [
  { alt: "Main Tour", index: 1, src: "/WaitlistPageImage.png" },
  { alt: "Tour Gallery", index: 2, src: "/tour.png" },
  { alt: "Tour Gallery", index: 3, src: "/tour2.png" },
  { alt: "Tour Gallery", index: 4, src: "/tour3.png" },
  { alt: "Main Tour", index: 1, src: "/WaitlistPageImage.png" },
  { alt: "Tour Gallery", index: 2, src: "/tour.png" },
  { alt: "Tour Gallery", index: 3, src: "/tour2.png" },
  { alt: "Tour Gallery", index: 4, src: "/tour3.png" },
];

const TourDetailsCard = ({ id }: { id: string }) => {
  const [activeImage, setActiveImage] = useState(tourImages[0]);
  const { data, isLoading, isError } = useGetTourQuery(id);

  const scrollContainerRef = useRef(null);
  const scroll = (direction: string) => {
    console.log(scrollContainerRef);
    if (scrollContainerRef.current) {
      const current = scrollContainerRef.current as HTMLElement; // Type assertion
      const scrollAmount =
        direction === "left" ? -current.scrollWidth : current.scrollWidth;
      current.scrollBy({ left: scrollAmount / 2, behavior: "smooth" }); // Scrolls half the width of the container
    }
  };

  const setActiveImageFxn = (
    tour: SetStateAction<{ alt: string; index: number; src: string }>
  ) => {
    setActiveImage(tour);
  };
  return (
    <div className="px-4 md:p-10 overflow-y-auto flex flex-col flex-wrap">
      <h2 className="text-2xl font-medium mb-4">Tour Details</h2>
      <div className="flex flex-col md:flex-row md:justify-between gap-6 ">
        {/* Left - Image Gallery */}
        <div className="flex flex-col gap-4 md:w-5/12">
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="w-full h-80 md:h-112 object-cover rounded-lg"
          />
          <ImageScrollContainer
            ImageMap={() =>
              tourImages.map((tour, index) => (
                <img
                  key={index}
                  src={tour.src}
                  alt={tour.alt}
                  onClick={() => setActiveImageFxn(tour)}
                  className="object-cover rounded-lg h-20 w-20 md:h-24 md:min-w-24 hover:cursor-pointer"
                />
              ))
            }
          />
        </div>

        {/* Right - Tour Details */}
        <div className="py-4 px-4 md:px-8 justify-between flex flex-col md:w-6/12 md:ml-[-16rem]">
          <div className="mb-5 md:mb-0 ">
            <h2 className="text-3xl font-bold mb-4">{data?.name}</h2>
            <p className="mb-6 text-[#5D5D5B] font-light text-sm md:w-5/6">
              {data?.description}
            </p>
            <div className="flex flex-wrap gap-4 md:w-5/6">
              <div className="flex flex-col md:flex-row items-center gap-2 text-white py-2 px-4 rounded-md bg-[#0F6E98]">
                <PiCalendarCheck color="FA7454" size={18} />
                <p className="text-sm font-thin">
                  {formatDateToCustomFormat(data?.startDate)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 text-white py-2 px-4 rounded-md bg-[#0F6E98]">
                <MdOutlineAttachMoney color="FA7454" size={18} />
                <p className="text-sm font-thin">Ghc. {data?.price}</p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 text-white py-2 px-4 rounded-md bg-[#0F6E98]">
                <HiOutlineUser color="FA7454" size={18} />
                <p className="text-sm font-thin">10/20</p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 text-white py-2 px-4 rounded-md bg-[#0F6E98]">
                <TfiLocationPin color="FA7454" size={18} />
                <p className="text-sm font-thin">{data?.destination?.name}</p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 text-white py-2 px-4 rounded-md bg-[#FA7454]">
                <LuLoader color="0F6E98" size={18} />
                <p className="text-sm font-thin">Upcoming</p>
              </div>
            </div>
          </div>
          <Link href={`/tours/createtour?id=${id}`}>
            <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-thin py-3 rounded-lg w-full md:w-5/6">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const TourDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <Layout
      title="Manage Tours"
      rightContent={<TourDetailsCard id={params.id} />}
    />
  );
};

export default TourDetailsPage;
