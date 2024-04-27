"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import LeftRightLayout from "@/components/LeftRightComponent";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./page.css";
import SuccessModal from "@/components/ui/SuccessModal";
import { useRegisterAgencyMutation } from "@/lib/features/agency/agencyApiSlice";
import { useToast } from "@/components/ui/use-toast";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Agency Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d+$/, "Phone number is not valid")
    .required("Phone number is required"),
  about: Yup.string().required("Agency Details is required"),
  address: Yup.string().required("Address is required"),
  role: Yup.string().required("Selecting your role is required."),
});

const AgencyDetailForm = ({
  setModalIsOpen,
}: {
  setModalIsOpen: (value: boolean) => void;
}) => {
  const [registerAgency] = useRegisterAgencyMutation();
  const { toast } = useToast();
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center h-full  px-4">
      <div>
        <h1 className="text-4xl text-center font-bold mb-6 text-[#1E4355]">
          Agency Details
        </h1>
        <p className="text-center mb-2">Start Building your Tours now!</p>
      </div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
          about: "",
          address: "",
          role: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          await registerAgency(values)
            .unwrap()
            .then(() => {
              setSubmitting(false);
              setModalIsOpen(true);
            })
            .catch(() =>
              toast({
                title: "Failed to create agency",
                description:
                  "Please fill all the required fields and try again",
                variant: "destructive",
              })
            );

          // Handle form submission, e.g., send data to an API or server
        }}
      >
        {({ setFieldValue, values, errors }) => (
          <Form className="px-8 pt-4 mb-4 w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Agency Name
              </label>
              <div className="relative">
                <FiUser className="absolute right-3 top-3 text-gray-400" />
                <Field
                  name="name"
                  type="text"
                  placeholder="Kwame Fusu"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="mb-8 relative">
              <FiMail className="absolute right-3 top-3 text-gray-400" />

              <Field
                name="email"
                type="email"
                placeholder="kwame@gmail.com"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
            </div>

            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phonenumber"
            >
              Phone Number
            </label>
            <div className="mb-4">
              <div
                className={`relative flex flex-row border border-gray-300 rounded-md ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
              >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="about"
            >
              About Agency
            </label>
            <div className="mb-4 relative">
              <textarea
                name="about"
                placeholder="Details"
                rows={2}
                onChange={(value) => setFieldValue("about", value.target.value)}
                value={values.about}
                className={`shadow appearance-none border rounded w-full pt-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                  errors.about ? "border-red-500" : ""
                }`}
              />
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <div className="mb-4 relative">
              <TfiLocationPin className="absolute right-3 top-3 text-gray-400" />
              <Field
                name="address"
                type="text"
                placeholder="No. 20 Banana Street"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Your Role
              </label>
              <Field
                name="role"
                as="select"
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                  errors.role ? "border-red-500" : ""
                }`}
              >
                <option value="">Select your role</option>
                <option value="manager">Manager</option>
                <option value="tour_guide">Tour Guide</option>
                <option value="marketing">Marketing</option>
                <option value="support">Support</option>
              </Field>
            </div>

            <div className="flex items-center justify-center w-full md:mt-8">
              <button
                type="submit"
                className="bg-button-blue-bg hover:bg-blue-700 text-white font-bold py-3 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Join Now
              </button>
            </div>
            <div className="text-center mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#FA7454] hover:text-blue-700 hover:cursor-pointer"
              >
                Login
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const AgencyDetail = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <LeftRightLayout
        leftImage={"/agencyDetail.png"}
        rightContent={<AgencyDetailForm setModalIsOpen={setModalIsOpen} />}
      />
      <SuccessModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setOTPModalIsOpen={() => {}}
      />
    </div>
  );
};

export default AgencyDetail;
