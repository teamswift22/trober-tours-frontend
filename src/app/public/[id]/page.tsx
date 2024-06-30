"use client";

import {
  Bus,
  CalendarCheck,
  LoaderCircle,
  MapPin,
  Share2,
  User,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetTourQuery } from "@/lib/features/tours/toursApiSlice";

const Details = ({ icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-x-2 ">
    <div className="bg-secondary rounded-full p-2 text-white">{icon}</div>
    <p className="font-sora font-bold text-lg md:text-xl text-[#00618F]">
      {text}
    </p>
  </div>
);
const AccordionComponent = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <Accordion type="single" collapsible className="max-w-[600px]">
    <AccordionItem value={title}>
      <AccordionTrigger className="font-normal">{title} </AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </AccordionItem>
  </Accordion>
);

const arrayOfIncludes = ["Tranport", "Accomodation", "Food"];
const stops = [
  {
    title: "Stop 1: Shai Hills",
    content:
      "have long to spend in Ghana. This full-day tour provides an opportunity to do just that, with a walking safari and rock climbing experience. ",
  },
  {
    title: "Stop 2: Shai Hills",
    content:
      "have long to spend in Ghana. This full-day tour provides an opportunity to do just that, with a walking safari and rock climbing experience. ",
  },

  {
    title: "Stop 3: Shai Hills",
    content:
      "have long to spend in Ghana. This full-day tour provides an opportunity to do just that, with a walking safari and rock climbing experience. ",
  },
  {
    title: "Stop 4: Shai Hills",
    content:
      "have long to spend in Ghana. This full-day tour provides an opportunity to do just that, with a walking safari and rock climbing experience. ",
  },
];
const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetTourQuery(params.id);
  console.log(data);
  return (
    <div className="max-w-7xl mx-auto px-2 py-5">
      <div className="flex flex-col gap-y-4 lg:flex-row items-start justify-between">
        <div className="space-y-3">
          <h4 className="font-bold font-sora text-xl md:text-3xl text-[#1D1D1D]">
            {data?.name}
          </h4>
          <p className="text-sm text-[#112211]">By Mainstream Tours</p>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="p-3 bg-secondary rounded-md text-primary-foreground font-medium">
            GHC {data?.price}
          </div>
          <div className="p-3 bg-[#00618F] rounded-md text-primary-foreground font-medium">
            Join Tour
          </div>
          <button className="bg-secondary text-white p-3 rounded-md ">
            <Share2 />
          </button>
        </div>
      </div>
      <div className="h-128 w-full bg-white my-8"></div>
      <div className="grid grid-cols-2 md:flex items-center flex-wrap justify-between gap-y-4 pt-6 pb-11 border-b-[2px]">
        <Details icon={<MapPin />} text={data?.destination.name} />
        <Details
          icon={<CalendarCheck />}
          text={new Date(data?.startDate).toDateString()}
        />
        <Details icon={<LoaderCircle />} text="2 Days" />
        <Details icon={<Bus />} text={data?.startingPoint.name} />
        <Details icon={<User />} text="10/20" />
        <Details icon={<User />} text={data?.category} />
      </div>
      <div className="pt-10 pb-3 border-b-[2px] ">
        <div className="px-5">
          <h4 className="font-sora font-bold text-[#333333] text-2xl mb-2">
            Overview
          </h4>
          <p className="text-justify">{data?.description}</p>
        </div>
      </div>
      <div className="py-12 px-5 border-b-2">
        <h4 className="font-sora font-bold text-[#333333] text-2xl mb-2">
          Price Includes:
        </h4>
        <div className="flex items-center flex-wrap gap-2">
          {data?.priceIncludes?.map((item) => (
            <p
              key={item}
              className="font-sora text-sm border-secondary border-[1px] w-fit px-3 py-1 rounded text-[#4F4F4F]"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="py-12 px-5 border-b-2">
        <h2 className="text-2xl font-bold font-sora">Itinerary</h2>
        {stops?.map((item) => (
          <AccordionComponent
            key={item.title}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
      <div className="py-12 px-5 border-b-2">
        <h2 className="text-2xl font-bold font-sora">Similar Experiences</h2>
      </div>
    </div>
  );
};

export default Page;
