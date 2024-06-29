"use client";
import Layout from "@/components/layout";
import NavBar from "@/components/navbar";
import React, { ReactElement, Suspense, useCallback, useMemo } from "react";
import TourDetails from "./Components/tourDetails";
import Location from "./Components/location";
import Itinerary from "./Components/itinerary";
import Transport from "./Components/transport";
import Accommodation from "./Components/accommodation";
import Media from "./Components/media";
import ParticipantForm from "./Components/participants";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCreateTourMutation,
  useEditTourMutation,
  useGetTourQuery,
} from "@/lib/features/tours/toursApiSlice";
import { useToast } from "@/components/ui/use-toast";

interface IList {
  "Tour Details": ReactElement;
  Location: ReactElement;
  Itinerary: ReactElement;
  Transport: ReactElement;
  Accommodation: ReactElement;
  Media: ReactElement;
  Participants: ReactElement;
}
// Dummy data for the tours

const navlinks: string[] = [
  "Tour Details",
  "Location",
  "Itinerary",
  "Transport",
  "Accommodation",
  "Media",
  "Participants",
];

const CreateTour = () => {
  const router = useRouter();
  const query = useSearchParams();
  const pageStep: keyof IList | string = query.get("step") || "Tour Details";
  const id = query.get("id");
  const step = query.get("step") || navlinks[0];
  const getActiveTab = (tab: React.SetStateAction<keyof IList>) => {
    if (id) {
      router.push(`?step=${tab}&id=${id}`);
    }
  };
  const { data: tourDetails } = useGetTourQuery(id || "");
  const { toast } = useToast();

  const [createTour] = useCreateTourMutation();
  const [editTour] = useEditTourMutation();

  // console.log(pageStep);
  // console.log(step);

  // const handleMoveToNextPage = async () => {
  //   const presentStep = query.get("step");
  //   console.log(presentStep);
  //   const nextStep = navlinks.indexOf(presentStep || "") + 1;
  //   console.log(nextStep);
  //   console.log("test");
  //   console.log(`?step=${navlinks[nextStep]}&id=${id}`);
  //   router.replace(`?step=${navlinks[nextStep]}&id=${id}`);
  // };

  const handleTourSubmission: (
    data: any,
    next?: boolean
  ) => Promise<void> = async (data) => {
    try {
      if (!id) {
        const response = await createTour(data).unwrap();
        const formId: string = response.tourId;
        const nextStep = navlinks.indexOf(step) + 1;
        router.replace(`?step=${navlinks[nextStep]}&id=${formId}`);
        toast({
          title: "Tour Created",
          description: "Tour created successfully",
        });
      } else {
        await editTour({ id, body: data }).unwrap();
        toast({
          title: "Tour Updated",
          description: "Tour updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const list: IList = useMemo(() => {
    return {
      "Tour Details": (
        <TourDetails
          handleSubmit={handleTourSubmission}
          tourDetails={tourDetails}
          getActiveTab={getActiveTab}
        />
      ),
      Location: (
        <Location
          handleSubmit={handleTourSubmission}
          tourDetails={tourDetails}
          getActiveTab={getActiveTab}
        />
      ),
      Itinerary: (
        <Itinerary
          tourDetails={tourDetails}
          formId={id}
          getActiveTab={getActiveTab}
        />
      ),
      Transport: (
        <Transport
          handleSubmit={handleTourSubmission}
          tourDetails={tourDetails}
          getActiveTab={getActiveTab}
        />
      ),
      Accommodation: (
        <Accommodation
          handleSubmit={handleTourSubmission}
          tourDetails={tourDetails}
          getActiveTab={getActiveTab}
        />
      ),
      Media: (
        <Media
          formId={id}
          tourDetails={tourDetails}
          getActiveTab={getActiveTab}
        />
      ),
      Participants: <ParticipantForm formId={id} />,
    };
  }, [tourDetails, id]);

  return (
    <div>
      <h2 className="text-2xl font-medium mb-4">Create Tour</h2>
      <NavBar
        navArray={navlinks}
        getActiveTab={getActiveTab}
        activeTab={pageStep}
        progessIndicator
      />

      {list[pageStep as keyof IList]}
    </div>
  );
};

const CreateTourPage = () => {
  return (
    <Suspense>
      <CreateTour />
    </Suspense>
  );
};

export default CreateTourPage;
