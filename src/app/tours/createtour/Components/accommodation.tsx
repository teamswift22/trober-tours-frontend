"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TfiLocationPin } from "react-icons/tfi";
import AccommodationFetch from "./accomodationComponents/accommodationFetch";
import AccommodationList from "./accomodationComponents/accommodationList";

type HotelData = {
  id: number;
  name: string;
  description: string;
  price: string;
  phone: string;
  image: string;
};

const hotelsData: HotelData[] = [
  {
    id: 1,
    name: "Perriman Hotel",
    description: "Guided tours in the heart of the city.",
    price: "420",
    phone: "020 594 3802",
    image: "/tour.png",
  },
  {
    id: 2,
    name: "Kempinski Hotel",
    description: "Guided tours in the heart of the city.",
    price: "200.00",
    phone: "020 594 3802",
    image: "/tour.png",
  },
  {
    id: 3,
    name: "Movenpick A. Hotel",
    description: "Guided tours in the heart of the city.",
    price: "500.00",
    phone: "020 594 3802",
    image: "/tour.png",
  },
  {
    id: 4,
    name: "Labadi Beach Hotel",
    description: "An exciting tour for thrill-seekers.",
    price: "50.00",
    phone: "020 594 3802",
    image: "/tour.png",
  },
  {
    id: 5,
    name: "Alisa Hotels",
    description: "Explore the rich history of the region.",
    price: "150.00",
    phone: "020 594 3802",
    image: "/tour.png",
  },
  {
    id: 6,
    name: "Accra City Hotel",
    description: "Guided tour in the heart of the city.",
    price: "200.00",
    phone: "020 594 3802",
    image: "/tour.png",
  },
  {
    id: 7,
    name: "Grand Star Hotel",
    description: "Guided tour in the heart of the city.",
    price: "500.00",
    phone: "020 594 3802",
    image: "/tour.png",
  },
  {
    id: 8,
    name: "The Mayflower Inn",
    description: "Culinary delights from around the city.",
    price: "50.00",
    phone: "020 594 3802",
    image: "/tour.png",
  },
];

const validationSchema = Yup.object({
  accommodationName: Yup.string().required("Accommodation name is required"),
  typeOfAccommodation: Yup.string().required(
    "Type of accommodation is required"
  ),
  checkInDate: Yup.date().required("Check-in date is required"),
  checkOutDate: Yup.date().required("Check-out date is required"),
  location: Yup.string().required("Location is required"),
  numberOfRooms: Yup.number()
    .required("Number of rooms is required")
    .positive("Number of rooms must be positive")
    .integer("Number of rooms must be an integer"),
});

type Amenity = "Pool" | "WiFi" | "Breakfast";
const location = { lat: 51.8762425, lng: -0.4207039 };
const Accommodation = ({ handleSubmit }: { handleSubmit: any }) => {
  const [activeTab, setActiveTab] = useState("Accommodation"); // State to manage which tab is active
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);

  const toggleAmenity = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenity)) {
        // Remove the amenity if it's already selected
        return prev.filter((a) => a !== amenity);
      } else {
        // Add the amenity if it's not selected
        return [...prev, amenity];
      }
    });
  };
  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="flex overflow-hidden">
        <button
          className={`py-2 px-4 text-xs sm:text-sm ${
            activeTab === "Accommodation"
              ? "bg-white text-[#00618F] font-medium"
              : " text-[#00618F] font-light"
          }`}
          onClick={() => setActiveTab("Accommodation")}
        >
          Accommodation
        </button>
        <button
          className={`py-2 px-4 text-sm ${
            activeTab === "Available Accommodation"
              ? "bg-white text-[#00618F] font-medium"
              : " text-[#00618F] font-light"
          }`}
          onClick={() => setActiveTab("Available Accommodation")}
        >
          Available Accommodation
        </button>
      </div>

      {activeTab === "Accommodation" && (
        <Formik
          initialValues={{
            accommodationName: "",
            typeOfAccommodation: "",
            checkInDate: "",
            checkOutDate: "",
            location: "",
            numberOfRooms: "",
            amenities: {
              pool: false,
              wifi: false,
              breakfast: false,
            },
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="bg-white p-4 sm:p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full sm:w-5/6">
                <div className="mb-4 space-y-2">
                  <label
                    htmlFor="accommodationName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Accommodation Name
                  </label>
                  <Field
                    name="accommodationName"
                    placeholder="Cozy Cottage"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="accommodationName"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="mb-4 space-y-2">
                  <label
                    htmlFor="checkInDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Check-in Date
                  </label>
                  <Field
                    type="time"
                    name="checkInDate"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                  />
                  <ErrorMessage
                    name="checkInDate"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="mb-4 space-y-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <TfiLocationPin className="absolute inset-y-0 right-3 my-auto text-gray-400" />
                    <Field
                      type="text"
                      name="location"
                      placeholder="Accra Mall"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                    />
                  </div>
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              <div className="w-full sm:w-5/6">
                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Type of Accommodation
                  </label>
                  <Field
                    name="typeOfAccommodation"
                    as="select"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select an accommodation type</option>
                    <option value="location1">Hotel</option>
                    <option value="location2">Guest House</option>
                  </Field>
                  <ErrorMessage
                    name="typeOfAccommodation"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="mb-4 space-y-2">
                  <label
                    htmlFor="checkOutDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Check-out Date
                  </label>
                  <Field
                    type="time"
                    name="checkOutDate"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="checkOutDate"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="mb-4 space-y-2">
                  <label
                    htmlFor="numberOfRooms"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Rooms
                  </label>
                  <Field
                    type="number"
                    name="numberOfRooms"
                    placeholder="30"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                  />
                  <ErrorMessage
                    name="numberOfRooms"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                {(["Pool", "WiFi", "Breakfast"] as Amenity[]).map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`py-2 px-4 rounded-lg  text-sm font-light ${
                      selectedAmenities.includes(amenity)
                        ? "bg-[#00618F] text-white"
                        : "bg-[#E8F6FD] text-[#00618F]"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </Form>
          )}
        </Formik>
      )}

      {activeTab === "Available Accommodation" && (
        <div className="bg-white p-4 sm:p-6 rounded-md shadow-sm">
          <AccommodationFetch
            apiKey={process.env.NEXT_PUBLIC_PLACES_KEY}
            location={location}
          >
            {({ accommodations, isLoading, error }) => {
              if (isLoading) return <p>Loading...</p>;
              if (error) return <p>Error fetching data: {error.message}</p>;
              return (
                <AccommodationList
                  accommodations={accommodations}
                  apiKey={process.env.NEXT_PUBLIC_PLACES_KEY}
                />
              );
            }}
          </AccommodationFetch>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:justify-between mt-10">
        <p>Showing available accommodations based on your set destination</p>
        <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-thin py-3 rounded-lg w-full sm:w-1/3">
          Next
        </button>
      </div>
    </div>
  );
};

export default Accommodation;
