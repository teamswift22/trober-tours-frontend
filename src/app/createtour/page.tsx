import Layout from "@/components/layout";
import NavBar from "@/components/navbar";
import React from "react";

// Dummy data for the tours

const CreateTour = () => {
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
      />
      <div className="mt-12 bg-white w-full">test</div>
    </div>
  );
};

const CreateTourPage = () => {
  return <Layout title="Manage Tours" rightContent={<CreateTour />} />;
};

export default CreateTourPage;
