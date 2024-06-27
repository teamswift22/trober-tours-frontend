"use client";
import React, { useState } from "react";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Layout from "@/components/layout";
import { FiMail, FiPhone } from "react-icons/fi";
import PlaceSearch from "@/components/google-maps/PlaceSearch";
import PersonalForm from "./components/personal";
import CompanyForm from "./components/company";

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

const ProfileForm = () => {
  const [activeTab, setActiveTab] = useState("Personal");
  return (
    <>
      <Head>
        <title>Team</title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[80%]">
          <ul className="flex mb-4 border-b">
            <li className="mr-6">
              <a
                onClick={() => {
                  setActiveTab("Personal");
                }}
                className={`${
                  activeTab == "Personal"
                    ? "text-[#00618F] font-bold"
                    : "text-[#BDBDBD]"
                } hover:cursor-pointer`}
              >
                Personal
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setActiveTab("Company");
                }}
                className={`${
                  activeTab == "Company"
                    ? "text-[#00618F] font-bold"
                    : "text-[#BDBDBD]"
                } hover:cursor-pointer`}
              >
                Company
              </a>
            </li>
          </ul>
          {activeTab == "Personal" ? <PersonalForm /> : <CompanyForm />}
        </div>
        <div className="flex justify-end w-[80%] mt-4">
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

const ProfilePage = () => {
  return <ProfileForm />;
};

export default ProfilePage;
