"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const stops = [
  { name: "Activity 1", distance: "Destination" },
  { name: "Activity 2", distance: "Stop 1" },
  { name: "Activity 3", distance: "Stop 2" },
  { name: "Activity 4", distance: "Stop 3" },
  { name: "Activity 4", distance: "Stop 3" },
  { name: "Activity 4", distance: "Stop 3" },
  { name: "Activity 4", distance: "Stop 3" },
  { name: "Activity 4", distance: "Stop 3" },
];

const Itinerary = () => {
  const validationSchema = Yup.object({
    itineraryName: Yup.string().required("Tour name is required"),
    activityDescription: Yup.string().required("Tour description is required"),
    startDate: Yup.date().required("Start date is required"),
    location: Yup.string().required("location is required"),
  });
  return (
    <div className="grid grid-cols-2">
      <div>
        <Formik
          initialValues={{
            itineraryName: "",
            activityDescription: "",
            startDate: "",
            location: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3 bg-white p-6 rounded-md shadow-sm gap-10 mt-10 w-5/6">
              <div>
                <label
                  htmlFor="itineraryName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Itinerary Name
                </label>
                <Field
                  name="itineraryName"
                  type="Text"
                  placeholder="Akosombo Invasion"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
                <ErrorMessage
                  name="itineraryName"
                  component="div"
                  className="text-red-500 text-xs pl-2 pt-2"
                />
              </div>

              <div>
                <label
                  htmlFor="activityDescription"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Activity Description
                </label>
                <Field
                  as="textarea"
                  name="activityDescription"
                  className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
                <ErrorMessage
                  name="activityDescription"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Select Location
                </label>
                <Field
                  name="location"
                  as="select"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                >
                  <option value="">Select a location</option>
                </Field>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Date
                </label>
                <Field
                  type="date"
                  name="startDate"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="flex justify-end mt-10">
                <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-thin py-3 rounded-lg w-1/3">
                  Add Activity
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex flex-col justify-between">
        <div className="mt-10 bg-white rounded-lg w-5/6 p-4 h-fit max-h-[350px] overflow-auto">
          <h1>Added Itinerary</h1>
          <div className="mt-6 px-4">
            {stops.map((item) => {
              return (
                <div
                  key={item.name}
                  className="flex flex-row w-full justify-between mb-4"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-[#BDBDBD] text-sm">{item.distance}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-[#82D0F3] px-4 py-1 rounded-full text-sm text-white h-fit">
                      Edit
                    </button>
                    <button className="bg-[#FDC3B5] px-4 py-1 rounded-full text-sm text-white h-fit">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg w-5/6">
          Next
        </button>
      </div>
    </div>
  );
};

export default Itinerary;
