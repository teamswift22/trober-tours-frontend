"use client";
import Layout from "@/components/layout";
import NavBar from "@/components/navbar";
import React, {
  ReactElement,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
} from "react";
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
} from "@/lib/features/tours/toursApiSlice";

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
  const getActiveTab = (tab: React.SetStateAction<keyof IList>) => {
    router.push(`?step=${tab}`);
  };
  const id = query.get("id");

  const [createTour] = useCreateTourMutation();
  const [editTour] = useEditTourMutation();

  const handleTourSubmission = useCallback(
    async (data: any) => {
      try {
        const step = query.get("step") || navlinks[0];
        const nextStep = navlinks.indexOf(step) + 1;
        if (!id) {
          const response = await createTour(data).unwrap();
          console.log(response);
          const formId: string = response.tourId;
          return router.push(`?id=${formId}&step=${navlinks[nextStep]}`);
        } else {
          const response = await editTour({ id, data }).unwrap();
          return router.push(`?id=${id}&step=${navlinks[nextStep]}`);
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    [createTour]
  );

  const list: IList = useMemo(() => {
    return {
      "Tour Details": <TourDetails handleSubmit={handleTourSubmission} />,
      Location: <Location tourId={id} />,
      Itinerary: <Itinerary handleSubmit={handleTourSubmission} />,
      Transport: <Transport handleSubmit={handleTourSubmission} />,
      Accommodation: <Accommodation handleSubmit={handleTourSubmission} />,
      Media: <Media handleSubmit={handleTourSubmission} />,
      Participants: <ParticipantForm handleSubmit={handleTourSubmission} />,
    };
  }, []);

  return (
    <div className="px-10">
      <h2 className="text-2xl font-medium mb-4">Create Tour</h2>
      <NavBar
        navArray={navlinks}
        getActiveTab={getActiveTab}
        activeTab={pageStep}
      />

      {list[pageStep as keyof IList]}
    </div>
  );
};

const CreateTourPage = () => {
  return (
    <Suspense>
      <Layout title="Manage Tours" rightContent={<CreateTour />} />
    </Suspense>
  );
};

export default CreateTourPage;
