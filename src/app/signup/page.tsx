"use client";
import React, { useCallback, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import LeftRightLayout from "@/components/LeftRightComponent";
import "react-phone-number-input/style.css";
import PhoneInput, { PhoneNumber } from "react-phone-number-input";
import "./page.css";
import SuccessModal from "@/components/ui/SuccessModal";
import OTPModal from "@/components/ui/OTPModal";
import {
  useRegisterMutation,
  useSendOtpMutation,
} from "@/lib/features/auth/authApiSlice";
import { useToast } from "@/components/ui/use-toast";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d+$/, "Phone number is not valid")
    .required("Phone number is required"),
});

const SignupForm = ({
  setModalIsOpen,
  setUserData,
}: {
  setModalIsOpen: (value: boolean) => void;
  setUserData: (value: {
    fullName: string;
    phoneNumber: string;
    email: string;
  }) => void;
}) => {
  const [sendOtp] = useSendOtpMutation();
  const { toast } = useToast();

  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center h-full  p-4 gap-6">
      <div>
        <h1 className="text-4xl text-center font-bold mb-6 text-[#1E4355]">
          Sign Up
        </h1>
        <p className="text-center mb-6">Start Building your Tours now!</p>
      </div>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phoneNumber: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await sendOtp({ phoneNumber: values.phoneNumber })
            .unwrap()
            .then(() => {
              setUserData(values);
              setModalIsOpen(true);
            })
            .catch(() =>
              toast({
                title: "Failed to signup",
                description: "Signup failed please try again",
                variant: "destructive",
              })
            );
          // Handle form submission, e.g., send data to an API or server
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="px-8 pt-6 pb-8 mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <div className="mb-4 relative">
              <FiUser className="absolute right-3 top-3 text-gray-400" />
              <Field
                name="fullName"
                type="text"
                placeholder="Kwame Fusu"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 text-xs pt-2 pl-2"
              />
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs pt-2 pl-2"
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phonenumber"
              >
                Phone Number
              </label>
              <div className="relative flex flex-row border border-gray-300 rounded-md">
                <FiPhone className="absolute right-3 top-3 text-gray-400" />
                <PhoneInput
                  international
                  defaultCountry="GH"
                  value={values.phoneNumber}
                  onChange={(value) => setFieldValue("phoneNumber", value)}
                  className="transparent-phone-input shadow appearance-none w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
              </div>
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-xs pt-2 pl-2"
              />
            </div>
            <div className="flex items-center justify-center w-full md:mt-12">
              <button
                type="submit"
                className="bg-button-blue-bg hover:bg-blue-700 text-white font-bold py-3 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Verify
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-center">
        By signing up you agree to our
        <span className="text-[#25ADE9] hover:cursor-pointer">
          {" "}
          Terms and Conditions Policy
        </span>
      </p>

      <p className="text-center">
        Already have an account?
        <a
          href="/login"
          className="text-[#FA7454] hover:text-blue-700 hover:cursor-pointer"
        >
          Login
        </a>
      </p>
    </div>
  );
};

const SignUp = () => {
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [OTPModalIsOpen, setOTPModalIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  return (
    <div>
      <LeftRightLayout
        leftImage={"images/WaitlistPageImage.png"}
        rightContent={
          <SignupForm
            setModalIsOpen={setOTPModalIsOpen}
            setUserData={setUserData}
          />
        }
      />
      <SuccessModal
        modalIsOpen={successModalIsOpen}
        setModalIsOpen={setSuccessModalIsOpen}
        setOTPModalIsOpen={setOTPModalIsOpen}
      />
      <OTPModal
        modalIsOpen={OTPModalIsOpen}
        setModalIsOpen={setOTPModalIsOpen}
        userData={userData}
      />
    </div>
  );
};

export default SignUp;
