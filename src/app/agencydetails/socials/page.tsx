"use client";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LeftRightLayout from "@/components/LeftRightComponent";
import SuccessModal from "@/components/ui/SuccessModal";
import { useToast } from "@/components/ui/use-toast";
import { FaFacebook, FaGlobe, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useEditAgencySocialsMutation } from "@/lib/features/agency/agencyApiSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  facebook: Yup.string(),
  instagram: Yup.string(),
  twitter: Yup.string(),
  youtube: Yup.string(),
  website: Yup.string(),
});

const SocialForm = ({
  setModalIsOpen,
  id,
}: {
  setModalIsOpen: (value: boolean) => void;
  id: string;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const [tourFrequency, setTourFrequency] = useState("");
  const [editAgencySocials] = useEditAgencySocialsMutation();
  const dispatch = useAppDispatch();

  const agencyId = params.get("id") || id;

  return (
    <div className="w-full max-w-lg flex flex-col items-center justify-center h-full  px-4">
      <div>
        <h1 className="text-4xl text-center font-bold mb-6 text-[#1E4355]">
          Agency Details
        </h1>
        <p className="text-center mb-2">Add social media Pages</p>
      </div>
      <Formik
        initialValues={{
          facebook: "",
          instagram: "",
          twitter: "",
          youtube: "",
          website: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          await editAgencySocials({
            body: { ...values, tourFrequency },
            agencyId: agencyId,
          })
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
                title: "Socials updated",
                variant: "default",
                description: "Socials updated successfully",
              });
              router.push("/app/home");
            })
            .catch((e) => {
              toast({
                title: "Socials not updated",
                variant: "destructive",
                description: "Socials not updated successfully",
              });
            });
        }}
      >
        {({ setFieldValue, values, errors }) => (
          <Form className="px-8 pt-4 mb-4 w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="facebook"
              >
                Facebook Page
              </label>
              <div className="relative">
                <FaFacebook className="absolute right-3 top-3 " />
                <Field
                  name="facebook"
                  type="text"
                  placeholder="link to facebook"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                    errors.facebook ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="instagram"
            >
              Instagram Link
            </label>
            <div className="mb-8 relative">
              <FaInstagram className="absolute right-3 top-3 " />

              <Field
                name="instagram"
                type="text"
                placeholder="link to instagram"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                  errors.instagram ? "border-red-500" : ""
                }`}
              />
            </div>

            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phonenumber"
            >
              Twitter/X Page
            </label>
            <div className="mb-4">
              <div
                className={`relative flex flex-row border border-gray-300 rounded-md ${
                  errors.twitter ? "border-red-500" : ""
                }`}
              >
                <FaXTwitter className="absolute right-3 top-3 " />
                <Field
                  name="twitter"
                  type="text"
                  placeholder="link to twitter"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                    errors.twitter ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="about"
            >
              Youtube Page
            </label>
            <div className="mb-4 relative">
              <div
                className={`relative flex flex-row border border-gray-300 rounded-md ${
                  errors.youtube ? "border-red-500" : ""
                }`}
              >
                <FaYoutube className="absolute right-3 top-3 " />
                <Field
                  name="youtube"
                  type="text"
                  placeholder="link to youtube"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                    errors.youtube ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Website
            </label>
            <div className="mb-4 relative">
              <FaGlobe className="absolute right-3 top-3 text-gray-400" />
              <Field
                name="website"
                type="text"
                placeholder="www.tours.com"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${
                  errors.website ? "border-red-500" : ""
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="tourFrequency"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tour Frequency
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className={`bg-[#FA7454] text-center py-2 text-white rounded-[4.87px]  hover:scale-105 ${
                    tourFrequency !== "Once a Month" && "opacity-70"
                  }`}
                  onClick={() => setTourFrequency("Once a Month")}
                >
                  Once a Month
                </button>
                <button
                  type="button"
                  className={`bg-[#FA7454] text-center py-2 text-white rounded-[4.87px]  hover:scale-105 ${
                    tourFrequency !== "Twice a Month" && "opacity-70"
                  }`}
                  onClick={() => setTourFrequency("Twice a Month")}
                >
                  Twice a Month
                </button>
                <button
                  type="button"
                  className={`bg-[#FA7454] text-center py-2 text-white rounded-[4.87px]  hover:scale-105 ${
                    tourFrequency !== "Once a Quater" && "opacity-70"
                  }`}
                  onClick={() => setTourFrequency("Once a Quater")}
                >
                  Once a Quater
                </button>
              </div>
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

const Page = ({ searchParams }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <LeftRightLayout
        leftImage={"/agencyDetail.png"}
        rightContent={
          <SocialForm setModalIsOpen={setModalIsOpen} id={searchParams.id} />
        }
      />
      <SuccessModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setOTPModalIsOpen={() => {}}
      />
    </div>
  );
};

export default Page;
