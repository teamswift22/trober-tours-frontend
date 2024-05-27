"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Tour name is required"),
  description: Yup.string().required("Tour description is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date can't be before start date")
    .required("End date is required"),
  price: Yup.number()
    .min(1, "Price must be at least $1")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
});

const TourDetails = ({
  handleSubmit,
  tourDetails,
}: {
  handleSubmit: (data: any) => void;
  tourDetails: any;
}) => {
  console.log(tourDetails);
  return (
    <div>
      <Formik
        initialValues={{
          name: tourDetails?.name || "",
          description: tourDetails?.description || "",
          startDate: tourDetails?.startDate?.split("T")[0] || "",
          endDate: tourDetails?.endDate?.split("T")[0] || "",
          price: tourDetails?.price || "",
          category: tourDetails?.category || "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleSubmit(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, values }) => {
          console.log(values);
          return (
            <Form
              id="tourDetails"
              className="space-y-3 bg-white p-4 sm:p-6 rounded-md shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10 mt-4 sm:mt-10"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tour Name
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Akosombo Invasion"
                  className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs pl-2 pt-2"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tour Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Start Date
                </label>
                <Field
                  type="date"
                  name="startDate"
                  className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  End Date
                </label>
                <Field
                  type="date"
                  name="endDate"
                  className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price
                </label>
                <Field
                  type="number"
                  name="price"
                  className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Category
                </label>
                <Field
                  name="category"
                  as="select"
                  className="shadow border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a category</option>
                  <option value="manager">Adventure</option>
                  <option value="tour_guide">Leisure</option>
                  <option value="marketing">Games</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="flex justify-end mt-10">
        <button
          form="tourDetails"
          type="submit"
          className="bg-[#FA7454] hover:bg-orange-600 text-white font-thin py-3 rounded-lg w-full sm:w-1/3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TourDetails;
