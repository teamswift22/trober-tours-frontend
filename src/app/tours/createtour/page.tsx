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

  const handleMoveToNextPage = useCallback(() => {
    const nextStep = navlinks.indexOf(step) + 1;
    router.push(`?step=${navlinks[nextStep]}&id=${id}`);
  }, []);

  const handleTourSubmission = useCallback(
    async (data: any, next: boolean = true) => {
      try {
        if (!id) {
          const response = await createTour(data).unwrap();
          const formId: string = response.tourId;
          const nextStep = navlinks.indexOf(step) + 1;
          router.push(`?step=${navlinks[nextStep]}&id=${formId}`);
          toast({
            title: "Tour Created",
            description: "Tour created successfully",
          });
        } else {
          console.log(data, "edit tour");
          await editTour({ id, body: data }).unwrap();
          toast({
            title: "Tour Updated",
            description: "Tour updated successfully",
          });
          next && handleMoveToNextPage();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
    [createTour]
  );

  const list: IList = useMemo(() => {
    return {
      "Tour Details": (
        <TourDetails
          handleSubmit={handleTourSubmission}
          tourDetails={tourDetails}
        />
      ),
      Location: (
        <Location
          handleSubmit={handleTourSubmission}
          tourDetails={tourDetails}
          moveToNextPage={handleMoveToNextPage}
          formId={id}
        />
      ),
      Itinerary: (
        <Itinerary moveToNextPage={handleMoveToNextPage} formId={id} />
      ),
      Transport: (
        <Transport
          handleSubmit={handleTourSubmission}
          tourDetails={tourDetails}
        />
      ),
      Accommodation: (
        <Accommodation
          handleSubmit={handleTourSubmission}
          tourDetails={tourDetails}
        />
      ),
      Media: <Media />,
      Participants: <ParticipantForm formId={id} />,
    };
  }, [tourDetails]);

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
