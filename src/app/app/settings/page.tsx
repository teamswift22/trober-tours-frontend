"use client";
import React, { useState } from "react";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Layout from "@/components/layout";
import { FiMail, FiPhone } from "react-icons/fi";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import PlaceSearch from "@/components/google-maps/PlaceSearch";
import PersonalForm from "./components/personal";
import CompanyForm from "./components/company";
import { useLogoutMutation } from "@/lib/features/auth/authApiSlice";
import { Button } from "@/components/ui/button";

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
  const [removeCookieSession] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const logoutuser = async () => {
    try {
      await removeCookieSession({}).unwrap();
      localStorage.removeItem("persistedData");
      dispatch(logout());
      window.location.href = "/";
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <Head>
        <title>Team</title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:max-w-[80%]">
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
        <div className="flex justify-end gap-x-3 w-[80%] mt-4">
          <Button className="xl:hidden" type="button" onClick={() => logout()}>
            Logout
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white font-medium ">
            Delete Account
          </Button>
        </div>
      </div>
    </>
  );
};

const ProfilePage = () => {
  return <ProfileForm />;
};

export default ProfilePage;
