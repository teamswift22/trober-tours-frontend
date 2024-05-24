"use client";
import React, { useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useAddActivityMutation,
  useEditActivityMutation,
  useGetActivitiesQuery,
} from "@/lib/features/tours/toursApiSlice";
import { useSearchParams } from "next/navigation";

const stops = [
  { name: "Activity 1", distance: "Destination" },
  { name: "Activity 2", distance: "Stop 1" },
  { name: "Activity 3", distance: "Stop 2" },
  { name: "Activity 4", distance: "Stop 3" },
  { name: "Activity 5", distance: "Stop 4" },
  { name: "Activity 6", distance: "Stop 5" },
  { name: "Activity 7", distance: "Stop 6" },
  { name: "Activity 8", distance: "Stop 7" },
];

const validationSchema = Yup.object({
  name: Yup.string().required("Itinerary name is required"),
  notes: Yup.string().required("Activity description is required"),
  date: Yup.date().required("Start date is required"),
  location: Yup.string().required("Location is required"),
});

const Itinerary = () => {
  const query = useSearchParams();
  const tourId = useMemo(() => query.get("id"), []);
  const [addActivity] = useAddActivityMutation();
  const [editActivity] = useEditActivityMutation();
  const { data } = useGetActivitiesQuery(tourId);

  console.log(data);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Formik
          initialValues={{
            name: "",
            notes: "",
            date: "",
            location: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              console.log(values);
              const response = await addActivity({
                tourId,
                body: values,
              }).unwrap();
              console.log(response);
              setSubmitting(false);
            } catch (error) {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className=" mt-0 sm:mt-10 space-y-3 bg-white p-6 rounded-md shadow-sm w-full sm:w-5/6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Itinerary Name
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Akosombo Invasion"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs pl-2 pt-2"
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Activity Description
                </label>
                <Field
                  as="textarea"
                  name="notes"
                  className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="notes"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Location
                </label>
                <Field
                  name="location"
                  as="select"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a location</option>
                  <option value="location1">Location 1</option>
                  <option value="location2">Location 2</option>
                </Field>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Date
                </label>
                <Field
                  type="date"
                  name="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  className="bg-[#FA7454] hover:bg-orange-600 text-white font-thin py-3 rounded-lg w-full sm:w-1/3"
                >
                  Add Activity
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <div className="mt-10 bg-white rounded-lg p-4 h-fit max-h-[350px] overflow-auto w-full sm:w-5/6 sm:mb-14">
          <h1 className="font-semibold">Added Itinerary</h1>
          <div className="mt-6 px-4">
            {stops.map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center mb-4"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-[#BDBDBD] text-sm">{item.distance}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-[#82D0F3] px-4 py-1 rounded-full text-sm text-white">
                    Edit
                  </button>
                  <button className="bg-[#FDC3B5] px-4 py-1 rounded-full text-sm text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg w-full sm:w-5/6 mt-6 sm:mt-0">
          Next
        </button>
      </div>
    </div>
  );
};

export default Itinerary;
