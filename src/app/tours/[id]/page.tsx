"use client";
import Layout from "@/components/layout";
import React, { SetStateAction, useState, useRef, useEffect } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { PiCalendarCheck } from "react-icons/pi";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import ImageScrollContainer from "@/components/ImageScrollComponent";
import { useGetTourQuery } from "@/lib/features/tours/toursApiSlice";
import { formatDateToCustomFormat } from "@/lib/utils";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { useGetTourSubscribersQuery } from "@/lib/features/subscriber/subscriberApiSlice";

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
  const [activeImage, setActiveImage] = useState<any>(null);
  const { data } = useGetTourQuery(id);
  const { data: tourParticipants } = useGetTourSubscribersQuery(id || "");

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

  useEffect(() => {
    setActiveImage(data?.media[0]);
  }, [data]);
  const setActiveImageFxn = (tour: SetStateAction<string>) => {
    setActiveImage(tour);
  };
  return (
    <div className="px-4 md:px-10 overflow-y-auto flex flex-col flex-wrap">
      <div className="w-full justify-between flex  mb-10">
        <h2 className="text-2xl font-medium mb-4">{data?.name}</h2>
        <div className="flex items-center justify-end gap-x-2">
          <Link href={`/tours/createtour?id=${id}`}>
            <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-thin p-3 rounded-md w-full">
              Edit Tour
            </button>
          </Link>
          <button className="bg-[#FA7454] text-white p-3 rounded-md ">
            <Share2 />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between gap-6 ">
        {/* Left - Image Gallery */}
        <div className="flex flex-col gap-4 md:w-6/12">
          <img
            src={activeImage}
            alt={activeImage}
            className="w-full h-80 md:h-96 object-cover rounded-lg"
          />
          <ImageScrollContainer
            ImageMap={() =>
              data?.media.map((tour: string) => (
                <img
                  key={tour}
                  src={tour}
                  alt={tour}
                  onClick={() => setActiveImageFxn(tour)}
                  className="object-cover rounded-lg h-20 w-20 md:h-24 md:min-w-24 hover:cursor-pointer"
                />
              ))
            }
          />
          <div className="pt-5 w-full ">
            <p className="mb-6 text-[#5D5D5B] font-light text-sm md:w-5/6 line-clamp-4">
              {data?.description}
            </p>
            <div className="flex flex-wrap gap-4">
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
        </div>

        {/* Right - Tour Details */}
        <div className="px-4 md:px-8 justify-between  flex flex-col md:w-5/12 md:ml-[-16rem]">
          <div className=" bg-white rounded-lg p-4 h-full overflow-auto w-full">
            <h1 className="font-semibold">Added Participants</h1>
            <div className="flex flex-col justify-between h-full max-h-[95%]">
              <div className="mt-6 px-4">
                {tourParticipants?.total < 1 && (
                  <p>Tour participants will show here once added</p>
                )}
                {tourParticipants?.tourSubscriptions?.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex flex-row justify-between items-center mb-4"
                  >
                    <div>
                      <p>{item?.subscriber?.name}</p>
                      <p className="text-[#BDBDBD] text-sm">
                        {item.subscriber.phoneNumber}
                      </p>
                    </div>
                    <button
                      // onClick={() =>
                      //   handleRemoveSelectedSubscriber(item?.subscriberId)
                      // }
                      className="bg-[#82D0F3] px-4 py-1 rounded-full text-sm text-white"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <Link href={`/tours/createtour?step=Participants&id=${id}`}>
                <button className="bg-[#FA7454] hover:bg-orange-600 text-white  py-3 text-xs  rounded-md max-w-[210px] w-full">
                  Add new participant
                </button>
              </Link>
            </div>
          </div>
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
