import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FiCheckSquare, FiMail, FiPhone, FiSquare } from "react-icons/fi";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useAddSubscriberMutation,
  useCreateSubscriberMutation,
  useGetAgencySubscribersQuery,
  useGetTourSubscribersQuery,
} from "@/lib/features/subscriber/subscriberApiSlice";
import { useToast } from "@/components/ui/use-toast";

// Validation schema using Yup
const participantSchema = Yup.object().shape({
  name: Yup.string().required("Participant name is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d+$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  note: Yup.string(),
});

const ParticipantForm = ({ formId }: { formId: string | null }) => {
  const [createSubscriber] = useCreateSubscriberMutation();
  const [addSubscribers] = useAddSubscriberMutation();
  const { data: tourParticipants } = useGetTourSubscribersQuery(formId || "");
  const { data } = useGetAgencySubscribersQuery("");
  const [selectedSubscribers, setSelectedSubscribers] = useState<any>([]);
  const { toast } = useToast();

  const handleAddSelectedSubscribers = async () => {
    try {
      if (selectedSubscribers.length > 0) {
        await addSubscribers({
          formId,
          body: { subscribers: selectedSubscribers },
        }).unwrap();
        toast({
          title: "Subscribers added successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error adding subscribers",
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <div className="bg-white">
        <Formik
          initialValues={{
            name: "",
            phoneNumber: "",
            email: "",
            note: "",
          }}
          validationSchema={participantSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true);
              await createSubscriber({ tourId: formId, body: values }).unwrap();
              setSubmitting(false);
              toast({
                title: "Participant added successfully",
              });
            } catch (error) {
              toast({
                title: "Error adding participant",
                variant: "destructive",
              });
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values, errors }) => {
            console.log(errors);

            return (
              <Form id="participantForm" className="space-y-6 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Participant Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Akosombo Invasion"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs pl-2 pt-2"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <div className="mb-4">
                      <div className="relative shadow border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent">
                        <FiPhone className="absolute right-3 top-3 text-gray-400" />
                        <PhoneInput
                          international
                          defaultCountry="GH"
                          value={values.phoneNumber}
                          onChange={(value) =>
                            setFieldValue("phoneNumber", value)
                          }
                          className="transparent-phone-input appearance-none w-full py-1 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
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
                    <div className="mb-8 relative">
                      <FiMail className="absolute right-3 top-3 text-gray-400" />

                      <Field
                        name="email"
                        type="email"
                        placeholder="kwame@gmail.com"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="note"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Note
                    </label>
                    <Field
                      as="textarea"
                      name="note"
                      placeholder="Any note for this participant"
                      className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="note"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="bg-black h-5/6 w-5/6 rounded-lg"></div>
                  <button
                    form="participantForm"
                    type="submit"
                    className="w-full md:w-auto bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 px-4 rounded-lg"
                  >
                    Add Participant
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="mt-10 bg-white rounded-lg p-4 h-fit max-h-[400px] overflow-auto w-full sm:w-5/6 sm:mb-14">
          <h1 className="font-semibold">Added Participants</h1>
          <div className="mt-6 px-4">
            {tourParticipants?.tourSubscriptions?.map((item: any) => (
              <div
                key={item._id}
                className="flex flex-row justify-between items-center mb-4"
              >
                <div>
                  <p>{item?.subscriber?.name}</p>
                  <p className="text-[#BDBDBD] text-sm">
                    {item.subscriber.phoneNumber}
                  </p>
                </div>
                <button className="bg-[#82D0F3] px-4 py-1 rounded-full text-sm text-white">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="mt-10 bg-white rounded-lg p-4 h-fit max-h-[350px]  w-full sm:w-5/6 mb-4">
            <h3 className="text-xl font-semibold mb-6">
              Previous Participants
            </h3>
            <ScrollArea className="h-[210px] overflow-auto px-4">
              {/* Todo items */}
              {data?.agencySubscriptions.map((participant: any) => (
                <div
                  key={participant._id}
                  className="flex items-center justify-between mb-6"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex">
                      {selectedSubscribers.includes(
                        participant?.subscriber?._id
                      ) ? (
                        <FiCheckSquare
                          size={20}
                          className="text-green-500 mr-4 hover: cursor-pointer transition-all"
                          onClick={() =>
                            setSelectedSubscribers((prev: any) =>
                              prev.filter(
                                (id: any) => id !== participant.subscriber?._id
                              )
                            )
                          }
                        />
                      ) : (
                        <FiSquare
                          size={20}
                          className="mr-4 hover: cursor-pointer transition-all"
                          onClick={() =>
                            setSelectedSubscribers((prev: any) => [
                              ...prev,
                              participant?.subscriber._id,
                            ])
                          }
                        />
                      )}
                      <div>
                        <p className="">{participant.subscriber.name}</p>
                        <p className="text-gray-500 text-sm font-light">
                          {participant.subscriber.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#82D0F3] px-4 py-1 rounded-full text-sm text-white">
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex flex-col justify-between items-end mt-2">
              <button
                onClick={() => handleAddSelectedSubscribers()}
                className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg w-full sm:w-2/6"
              >
                Add Selected
              </button>
            </div>
          </div>
          <button className="mt-4 w-full sm:w-5/6 bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantForm;
