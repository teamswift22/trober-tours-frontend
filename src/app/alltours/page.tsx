"use client";

import React, { Suspense } from "react";
import Layout from "@/components/layout";
import NavBar from "@/components/navbar";
import { useGetToursQuery } from "@/lib/features/tours/toursApiSlice";
import { useSearchParams, useRouter } from "next/navigation";

// Dummy data for the tours
const toursData = [
  {
    id: 1,
    name: "Easter in Akosombo",
    description:
      "Guided tour in the heart of the city. Guided tour in the heart of the city.",
    price: "150.00",
    image: "/tour.png",
  },
  {
    id: 2,
    name: "Invading Cape coast",
    description:
      "Guided tour in the heart of the city. Guided tour in the heart of the city.",
    price: "200.00",
    image: "/tour2.png",
  },
  {
    id: 3,
    name: "Mountain Afadjato",
    description:
      "Guided tour in the heart of the city. Guided tour in the heart of the city.",
    price: "500.00",
    image: "/tour3.png",
  },
  {
    id: 4,
    name: "Easter in Akosombo",
    description:
      "Guided tour in the heart of the city. Guided tour in the heart of the city.",
    price: "150.00",
    image: "/tour.png",
  },
  {
    id: 5,
    name: "Invading Cape coast",
    description:
      "Guided tour in the heart of the city. Guided tour in the heart of the city.",
    price: "200.00",
    image: "/tour2.png",
  },
  {
    id: 6,
    name: "Mountain Afadjato",
    description:
      "Guided tour in the heart of the city. Guided tour in the heart of the city.",
    price: "500.00",
    image: "/tour3.png",
  },
  {
    id: 7,
    name: "Easter in Akosombo",
    description:
      "Guided tour in the heart of the city. Guided tour in the heart of the city.",
    price: "150.00",
    image: "/tour.png",
  },
  {
    id: 8,
    name: "Invading Cape coast",
    description:
      "Guided tour in the heart of the city. Guided tour in the heart of the city.",
    price: "200.00",
    image: "/tour2.png",
  },
  {
    id: 9,
    name: "Mountain Afadjato",
    description:
      "Guided tour in the heart of the city. Guided tour in the heart of the city.",
    price: "500.00",
    image: "/tour3.png",
  },
  // ... more tours
];

const ManageTours = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "alltours";

  const { data: allTours, isLoading, isError, error } = useGetToursQuery("");

  const handleTourClick = (tourName: string) => {
    router.push(`?tab=${tourName.replace(/\s+/g, "").toLowerCase()}`);
    // Implement further logic on click
  };

  return (
    <div className="px-10">
      <h2 className="text-2xl font-medium mb-4">Manage Tours</h2>
      <NavBar
        navArray={["All Tours", "Upcoming", "Completed", "Cancelled"]}
        getActiveTab={handleTourClick}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allTours?.tours?.map((tour: any) => (
          <div
            key={tour.id}
            className="p-4 w-66 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 "
          >
            <img
              src={tour?.image || "/no-img.jpg"}
              alt={tour.name}
              className="w-full h-48 object-cover rounded-2xl mb-2"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{tour.name}</h3>
              <p className="text-xs font-light">{tour.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500">{`₵${tour.price}`}</span>
                <button
                  // onClick={() => handleTourClick(tour.name)}
                  className="flex text-sm text-white bg-[#FA7454] px-6 py-2 rounded-md transition-colors duration-300"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManageToursPage = () => {
  return (
    <Suspense>
      <Layout title="Manage Tours" rightContent={<ManageTours />} />
    </Suspense>
  );
};

export default ManageToursPage;
