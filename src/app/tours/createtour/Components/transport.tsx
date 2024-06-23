"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TfiLocationPin } from "react-icons/tfi";
import { FiPhone, FiUser } from "react-icons/fi";
import PhoneInput from "react-phone-number-input";
import "../../../agencydetails/page.css";
import "react-phone-number-input/style.css";
import { useToast } from "@/components/ui/use-toast";

// Dummy data for the tours

const Transport = ({
  handleSubmit,
  tourDetails,
  getActiveTab,
}: {
  handleSubmit: any;
  tourDetails: any;
  getActiveTab: (tab: any) => void;
}) => {
  const validationSchema = Yup.object().shape({
    modeOfTransport: Yup.string(),
    departureTime: Yup.string().required("Departure time is required"),
    // .matches(
    //   /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] [AP]M$/,
    //   "Enter a valid time in HH:MM AM/PM format"
    // ),
    // meetingPoint: Yup.string().required("Meeting point is required"),
    busType: Yup.string().required("Bus type is required"),
    returnTime: Yup.string()
      .required("Return time is required")
      // .matches(
      //   /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] [AP]M$/,
      //   "Enter a valid time in HH:MM AM/PM format"
      // )
      .test(
        "is-greater",
        "Return time must be after departure time",
        function (value) {
          const { departureTime } = this.parent;
          const [departureHours, departureMinutes] =
            departureTime.split(/:|\s/);
          const [returnHours, returnMinutes] = value.split(/:|\s/);
          const departureDate = new Date(
            0,
            0,
            0,
            departureHours,
            departureMinutes
          );
          const returnDate = new Date(0, 0, 0, +returnHours, +returnMinutes);
          return returnDate > departureDate;
        }
      ),
    contactPersonNumber: Yup.string(),
    numberOfParticipants: Yup.number()
      .required("Number of participants is required")
      .positive("Number of participants must be positive")
      .integer("Number of participants must be an integer"),
  });

  const { toast } = useToast();
  return (
    <div>
      <Formik
        initialValues={{
          modeOfTransport: tourDetails?.transportation?.modeOfTransport || "",
          departureTime: tourDetails?.transportation?.departureTime || "",
          // meetingPoint: tourDetails?.transportation?.meetingPoint || "",
          busType: tourDetails?.transportation?.busType || "",
          returnTime: tourDetails?.transportation?.returnTime || "",
          numberOfParticipants:
            tourDetails?.transportation?.numberOfParticipants || "",
          contactPersonNumber:
            tourDetails?.transportation?.contactPersonNumber || "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          try {
            handleSubmit({ transportation: values });
            toast({ title: "Transportation added" });
            setSubmitting(false);
            getActiveTab("Accommodation");
          } catch (error) {
            toast({ title: "Failed to add transportation added" });
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, values, errors }) => {
          console.log(errors, "form errors");
          console.log(values, "form values");
          return (
            <Form
              id="transportForm"
              className=" bg-white p-6 rounded-md shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10"
            >
              <div>
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Mode of Transport
                </label>
                <Field
                  name="modeOfTransport"
                  as="select"
                  className="shadow border rounded w-full sm:w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                >
                  <option value="">Select a mode of transport</option>
                  <option value="self_drive_bus">Self Drive Bus</option>
                  <option value="rental_bus">Rental Bus</option>
                  <option value="private_car">Private Car</option>
                </Field>
                <ErrorMessage
                  name="modeOfTransport"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Bus Type
                </label>
                <Field
                  name="busType"
                  disabled={values.modeOfTransport == "private_car"}
                  as="select"
                  className="shadow border rounded w-full sm:w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                >
                  <option value="">Select a bus type</option>
                  <option value="30 seater">Coaster 30 Seater</option>
                  <option value="15 seater">Coaster 15 Seater</option>
                </Field>
                <ErrorMessage
                  name="busType"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="departureTime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Departure Time
                </label>
                <Field
                  type="time"
                  name="departureTime"
                  className="shadow appearance-none border rounded w-full sm:w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
                <ErrorMessage
                  name="departureTime"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="returnTime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Return Time
                </label>
                <Field
                  type="time"
                  name="returnTime"
                  className="shadow appearance-none border rounded w-full sm:w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
                <ErrorMessage
                  name="returnTime"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* <div className="w-full sm:w-5/6 ">
                <label
                  htmlFor="meetingPoint"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Meeting Point
                </label>
                <div className="mb-4 relative">
                  <TfiLocationPin className="absolute right-3 top-3 text-gray-400" />
                  <Field
                    name="meetingPoint"
                    type="text"
                    placeholder="No. 20 Banana Street"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                  />
                </div>
                <ErrorMessage
                  name="meetingPoint"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div> */}

              <div className="w-full sm:w-5/6 ">
                <label
                  htmlFor="numberOfParticipants"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Participants
                </label>
                <div className="relative">
                  <FiUser className="absolute right-3 top-3 text-gray-400" />
                  <Field
                    name="numberOfParticipants"
                    type="number"
                    placeholder="30"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                  />
                </div>

                <ErrorMessage
                  name="numberOfParticipants"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="w-full sm:w-5/6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="contactPersonNumber"
                >
                  Contact Person
                </label>
                <div className="mb-4">
                  <div className="relative shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent">
                    <FiPhone className="absolute right-3 top-3 text-gray-400" />
                    <PhoneInput
                      international
                      defaultCountry="GH"
                      value={values.contactPersonNumber}
                      onChange={(value) =>
                        setFieldValue("contactPersonNumber", value)
                      }
                      className="transparent-phone-input appearance-none w-full py-1 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="flex justify-end mt-10">
        <button
          form="transportForm"
          type="submit"
          className="bg-[#FA7454] hover:bg-orange-600 text-white font-thin py-3 rounded-lg w-full sm:w-1/3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Transport;
