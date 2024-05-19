"use client";
import Layout from "@/components/layout";
import NavBar from "@/components/navbar";
import React, { useState, ReactElement } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TourDetails from "./Components/tourDetails";
import Location from "./Components/location";
import Itinerary from "./Components/itinerary";
import Transport from "./Components/transport";
import Accommodation from "./Components/accommodation";
import Media from "./Components/media";
import ParticipantForm from "./Components/participants";

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
const list: IList = {
  "Tour Details": <TourDetails />,
  Location: <Location />,
  Itinerary: <Itinerary />,
  Transport: <Transport />,
  Accommodation: <Accommodation />,
  Media: <Media />,
  Participants: <ParticipantForm />,
};

const CreateTour = () => {
  const [activeTab, setActiveTab] = useState<keyof IList>("Tour Details");
  const getActiveTab = (tab: React.SetStateAction<keyof IList>) => {
    setActiveTab(tab);
  };
  return (
    <div className="px-10">
      <h2 className="text-2xl font-medium mb-4">Create Tour</h2>
      <NavBar
        navArray={[
          "Tour Details",
          "Location",
          "Itinerary",
          "Transport",
          "Accommodation",
          "Media",
          "Participants",
        ]}
        getActiveTab={getActiveTab}
      />

      {list[activeTab]}
    </div>
  );
};

const CreateTourPage = () => {
  return <Layout title="Manage Tours" rightContent={<CreateTour />} />;
};

export default CreateTourPage;
