"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const stops = [
  { name: "Stop 1", distance: "200km" },
  { name: "Stop 2", distance: "200km" },
  { name: "Stop 3", distance: "200km" },
  { name: "Stop 4", distance: "200km" },
];

const Location = () => {
  const validationSchema = Yup.object({
    destination: Yup.string().required("Tour name is required"),
    stop: Yup.string().required("Tour description is required"),
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div>
        <Formik
          initialValues={{
            destination: "",
            stop: "",
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
            <Form className="space-y-6 mt-10 w-full sm:w-5/6">
              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Set Destination
                </label>
                <Field
                  name="destination"
                  type="Text"
                  placeholder="Akosombo Invasion"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
                <ErrorMessage
                  name="destination"
                  component="div"
                  className="text-red-500 text-xs pl-2 pt-2"
                />
              </div>
              <div>
                <label
                  htmlFor="tourName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Add Stops
                </label>
                <Field
                  name="tourName"
                  type="Text"
                  placeholder="Akosombo Invasion"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
                <ErrorMessage
                  name="tourName"
                  component="div"
                  className="text-red-500 text-xs pl-2 pt-2"
                />
              </div>

              <div className="flex justify-end mt-10">
                <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 px-3 rounded-lg sm:w-1/3">
                  Set Destination
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-10 bg-white rounded-lg w-full sm:w-5/6 p-4">
          <h1>Added Stops</h1>
          <div className="mt-6 px-4">
            {stops.map((item) => {
              return (
                <div
                  key={item.name}
                  className="flex flex-row w-full justify-between"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-[#BDBDBD] text-sm">{item.distance}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-[#82D0F3] px-2 sm:px-4 py-1 rounded-full text-sm text-white h-fit">
                      Edit
                    </button>
                    <button className="bg-[#FDC3B5] px-2 sm:px-4 py-1 rounded-full text-sm text-white h-fit">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg w-full sm:w-5/6">
          Next
        </button>
      </div>
    </div>
  );
};

export default Location;
