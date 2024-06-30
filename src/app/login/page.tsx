/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { FiLock, FiPhone } from "react-icons/fi";
import LeftRightLayout from "@/components/LeftRightComponent";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./page.css";
import SuccessModal from "@/components/ui/SuccessModal";
import { useLoginMutation } from "@/lib/features/auth/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+?\d+$/, "Phone number is not valid")
    .required("Phone number is required"),
  pin: Yup.string()
    .required("Please enter your PIN")
    .min(4, "PIN must be at least 4 digits")
    .max(4, "PIN cannot be more than 4 digits")
    .matches(/^\d+$/, "PIN must be numeric"),
});

const LoginForm = ({
  setModalIsOpen,
}: {
  setModalIsOpen: (value: boolean) => void;
}) => {
  const [loginUser] = useLoginMutation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center h-full  p-4 gap-6">
      <div>
        <h1 className="text-4xl text-center font-bold mb-6 text-[#1E4355]">
          Login
        </h1>
        <p className="text-center mb-6">Start Building your Tours now!</p>
      </div>
      <Formik
        initialValues={{
          phoneNumber: "",
          pin: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          await loginUser(values)
            .unwrap()
            .then((res) => {
              const userDataToSet = {
                token: res.accessToken,
                user: res.user,
              };
              dispatch(login(userDataToSet));
              localStorage.setItem(
                "persistedData",
                JSON.stringify(userDataToSet)
              );
              toast({
                title: "Success",
                description: "Login successful",
                variant: "default",
              });
              router.replace("/app");
            })
            .catch(() =>
              toast({
                title: "Error",
                description: "Invalid phone number or PIN",
                variant: "destructive",
              })
            );
          // Handle form submission, e.g., send data to an API or server
        }}
      >
        {({ setFieldValue, values, errors }) => (
          <Form className="px-8 pt-4 mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phonenumber"
            >
              Phone Number
            </label>
            <div className="mb-4">
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
                className="text-red-500 text-xs pl-2 pt-2"
              />
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pin"
            >
              Pin
            </label>
            <div className="mb-4 w-full relative">
              <FiLock className="absolute right-3 top-3 text-gray-400" />
              <Field
                name="pin"
                type="password"
                placeholder="****"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              />
              <ErrorMessage
                name="pin"
                component="div"
                className="text-red-500 text-xs pl-2 pt-2"
              />
            </div>
            <div className="flex items-center justify-center w-full md:mt-8">
              <button
                type="submit"
                className="bg-button-blue-bg hover:bg-blue-700 text-white font-bold py-3 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-[#FA7454] hover:text-blue-700 hover:cursor-pointer"
              >
                Sign Up
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Login = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <LeftRightLayout
        leftImage={"/agencyDetail.png"}
        rightContent={<LoginForm setModalIsOpen={setModalIsOpen} />}
      />
      <SuccessModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setOTPModalIsOpen={() => {}}
      />
    </div>
  );
};

export default Login;
