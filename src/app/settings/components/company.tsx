"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FiMail, FiPhone } from "react-icons/fi";

const validationSchema = Yup.object({
  agencyName: Yup.string().required("Agency Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d+$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string(),
  about: Yup.string().required("About is required"),
  toursCreated: Yup.number().required("Tours Created is required"),
  totalParticipants: Yup.number().required("Total Participants is required"),
});

const CompanyForm = () => {
  return (
    <div className="p-4">
      <Formik
        initialValues={{
          agencyName: "",
          phoneNumber: "",
          email: "",
          address: "",
          about: "",
          toursCreated: "",
          totalParticipants: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center mb-4 md:col-span-2">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="agencyName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Agency Name
                  </label>
                  <Field
                    name="agencyName"
                    type="text"
                    placeholder="Kwame Fuso"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="agencyName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Agency Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <Field
                      name="email"
                      type="email"
                      placeholder="kwame@gmail.com"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Agency Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3 text-gray-400" />
                    <PhoneInput
                      international
                      defaultCountry="GH"
                      value={values.phoneNumber}
                      onChange={(value) => setFieldValue("phoneNumber", value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                    />
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Agency Address
                  </label>
                  <Field
                    name="address"
                    type="text"
                    placeholder="Address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Agency About
                  </label>
                  <Field
                    name="about"
                    as="textarea"
                    placeholder="Owner"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="about"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="toursCreated"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tours Created
                  </label>
                  <Field
                    name="toursCreated"
                    type="number"
                    placeholder="6"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="toursCreated"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="totalParticipants"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Total Participants
                  </label>
                  <Field
                    name="totalParticipants"
                    type="number"
                    placeholder="78"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="totalParticipants"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyForm;
