"use client";
import React from "react";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FiMail, FiPhone } from "react-icons/fi";
import PlaceSearch from "@/components/google-maps/PlaceSearch";
import { useGetAgencyMemberQuery } from "@/lib/features/agency-member/agencyMemeberSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d+$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string(),
  role: Yup.string().required("Role is required"),
});

const PersonalForm = () => {
  const { data: userData } = useGetAgencyMemberQuery("");

  return (
    <div className="p-4">
      <Formik
        enableReinitialize
        initialValues={{
          name: userData?.fullName || "",
          phoneNumber: userData?.phoneNumber || "",
          email: userData?.email || "",
          address: "",
          role: userData?.role || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue, values, errors }) => (
          <Form className="space-y-4 flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center relative">
                <span className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v4m0 0v4m0-4h4m-4 0H8m6 4h.01M6.5 20a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="space-y-4 w-full">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Akosombo Invasion"
                  className="shadow appearance-none border rounded w-full md:w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs pl-2 pt-2"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phonenumber"
                >
                  Phone Number
                </label>
                <div className="mb-4">
                  <div className="relative flex flex-row border border-gray-300 rounded-md w-full md:w-4/6">
                    <FiPhone className="absolute right-3 top-3 text-gray-400" />
                    <PhoneInput
                      international
                      defaultCountry="GH"
                      value={values.phoneNumber}
                      onChange={(value) => setFieldValue("phoneNumber", value)}
                      className="transparent-phone-input shadow appearance-none w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="mb-8 relative w-full md:w-4/6">
                  <FiMail className="absolute right-3 top-3 text-gray-400" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="kwame@gmail.com"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-4/6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <PlaceSearch
                  onPlaceSelect={(value: string) => {
                    setFieldValue("address", value);
                  }}
                  location={values.address}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="w-full md:w-4/6">
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Role
                </label>
                <Field
                  name="role"
                  as="select"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                >
                  <option value="">Select your role</option>
                  <option value="owner">Owner</option>
                  <option value="manager">Manager</option>
                  <option value="tour_guide">Tour Guide</option>
                  <option value="marketing">Marketing</option>
                  <option value="support">Support</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="flex justify-end w-full md:w-4/6 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalForm;
