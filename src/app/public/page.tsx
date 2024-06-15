import TourView from "@/components/public/TourView";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <div className="relative w-full h-128 lg:h-[50.563rem]">
        <Image src="/bg-hero.png" className="absolute" alt="Hero Image" fill />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex justify-center items-center flex-col">
          <h1 className="lg:text-5xl text-3xl font-bold ">
            Create or join a group tour, and explore the world together.
          </h1>
          <p className="lg:text-xl text-sm  max-w-128 mt-4">
            Plan solo or group trips, book tours happening around or get
            connected to top travel curators to help you plan your next
            adventure.
          </p>
          <div className=" flex items-center gap-x-3 mt-5">
            <Button className="rounded-full bg-[#53BFEE] hover:bg-[#53BFEE]">
              Create Tour
            </Button>
            <Button className="rounded-full bg-white text-black hover:bg-white">
              Create Tour
            </Button>
          </div>
        </div>
      </div>
      <TourView />
    </div>
  );
};

export default Page;
