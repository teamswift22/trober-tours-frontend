"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { FiLock } from "react-icons/fi";
import LeftRightLayout from "@/components/LeftRightComponent";
import "react-phone-number-input/style.css";
import "./page.css";
import SuccessModal from "@/components/ui/SuccessModal";
import { useSetPinMutation } from "@/lib/features/auth/authApiSlice";
import { useToast } from "@/components/ui/use-toast";

// Validation schema using Yup
const PinSchema = Yup.object().shape({
  pin: Yup.string()
    .required("Please enter your PIN")
    .min(4, "PIN must be at least 4 digits")
    .max(4, "PIN cannot be more than 4 digits")
    .matches(/^\d+$/, "PIN must be numeric"),
  confirmPin: Yup.string()
    .required("Please confirm your PIN")
    .oneOf([Yup.ref("pin")], "PINs must match"),
});

const SetPinForm = ({
  setModalIsOpen,
}: {
  setModalIsOpen: (value: boolean) => void;
}) => {
  const router = useRouter();
  const [setPin] = useSetPinMutation();
  const { toast } = useToast();

  return (
    <Formik
      initialValues={{ pin: "", confirmPin: "" }}
      validationSchema={PinSchema}
      onSubmit={async (values, { setSubmitting }) => {
        // You would handle the PIN submission here
        await setPin({ pin: values.pin })
          .unwrap()
          .then(() => {
            setSubmitting(false);
            toast({
              title: "Success",
              description: "Pin set successfully",
              variant: "default",
            });
            router.push("/agencydetails", { scroll: false });
          })
          .catch(() => {
            toast({
              title: "Failed",
              description: "Please check your pin and try again",
              variant: "destructive",
            });
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="rounded px-8 pt-6 pb-8 gap-10 mb-4 flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#1E4355]">Set Pin</h2>
            <p className="mb-8">Set a secure Pin to access your account with</p>
          </div>
          <div className="w-full">
            <label
              htmlFor="pin"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter Pin
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
                className="text-red-500 text-xs italic"
              />
            </div>

            <label
              htmlFor="confirmPin"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Pin
            </label>
            <div className="mb-6 w-full relative">
              <FiLock className="absolute right-3 top-3 text-gray-400" />
              <Field
                name="confirmPin"
                type="password"
                placeholder="****"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              />
              <ErrorMessage
                name="confirmPin"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className=" bg-button-blue-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Set Pin
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
  );
};

const SetPinPage = () => {
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  return (
    <div>
      <LeftRightLayout
        leftImage={"/LandingPageImage.png"}
        rightContent={<SetPinForm setModalIsOpen={setSuccessModalIsOpen} />}
      />
      <SuccessModal
        modalIsOpen={successModalIsOpen}
        setModalIsOpen={setSuccessModalIsOpen}
        setOTPModalIsOpen={() => {}}
      />
    </div>
  );
};

export default SetPinPage;
