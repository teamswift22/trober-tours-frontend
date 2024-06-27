"use client";

// pages/dashboard.tsx
import Head from "next/head";
import Layout from "@/components/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NotificationModal from "@/components/ui/notificationModal";
import {
  useGetAgencySubscribersQuery,
  useGetSubscribersTourSubscriptionsQuery,
  useSendNotificationToSubscribersMutation,
} from "@/lib/features/subscriber/subscriberApiSlice";
import { useToast } from "@/components/ui/use-toast";

const Participants: React.FC = () => {
  const { data: subscribers } = useGetAgencySubscribersQuery({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);
  const [participantsSelected, setParticipantsSelected] = useState<any>([]);
  const { data } = useGetSubscribersTourSubscriptionsQuery(
    selectedParticipant?.subscriberId
  );
  const [sendNotifications] = useSendNotificationToSubscribersMutation();
  const { toast } = useToast();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    notes: Yup.string(),
  });
  const handleSelectParticipant = (subscriberId: string) => {
    setParticipantsSelected((prev: any[]) => {
      if (prev.includes(subscriberId)) {
        return prev.filter((id) => id !== subscriberId);
      } else {
        return [...prev, subscriberId];
      }
    });
  };

  const sendNotification = () => {
    if (participantsSelected.length > 0) {
      sendNotifications({
        body: {
          subscribers: participantsSelected,
        },
      })
        .unwrap()
        .then(() =>
          toast({
            title: "Notification sent",
            description: "Notification sent successfully",
            variant: "default",
          })
        )
        .catch((error) => {
          toast({
            title: "Error sending notification",
            description: error.message,
            variant: "destructive",
          });
        });
    }
  };
  return (
    <>
      <Head>
        <title>Subscribers</title>
      </Head>
      <div className="p-4 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 h-fit w-full">
            <h3 className="text-xl font-semibold mb-6">
              Previous Participants
            </h3>
            <ScrollArea className="max-h-[500px] overflow-auto px-4">
              {subscribers?.agencySubscriptions?.map((participant: any) => (
                <div
                  key={participant.subscriberId}
                  className={`flex items-center justify-between mb-6 cursor-pointer rounded-md p-2 ${
                    participant.subscriberId ===
                    selectedParticipant?.subscriberId
                      ? "bg-[#25ADE9]"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex">
                      {participantsSelected.includes(
                        participant.subscriberId
                      ) ? (
                        <FiCheckSquare
                          size={20}
                          className="text-green-500 mr-4 cursor-pointer"
                          onClick={() =>
                            handleSelectParticipant(participant.subscriberId)
                          }
                        />
                      ) : (
                        <FiSquare
                          size={20}
                          className="mr-4 cursor-pointer"
                          onClick={() =>
                            handleSelectParticipant(participant.subscriberId)
                          }
                        />
                      )}
                      <div
                        onClick={() => {
                          setSelectedParticipant(participant);
                        }}
                      >
                        <p>{participant.subscriber.name}</p>
                        <p className="text-gray-500 text-sm font-light">
                          {participant.subscriber.email}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-light">
                      {participant.subscriber.phoneNumber}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex flex-col justify-between items-start px-6 mt-2">
              <button
                onClick={() => sendNotification()}
                className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 px-1 text-sm rounded-lg w-full sm:w-3/6"
              >
                Send Notification
              </button>
            </div>
          </div>

          <div className="flex justify-end h-fit">
            <div className="bg-white p-4 sm:p-10 rounded-md w-full">
              <Formik
                initialValues={{
                  name: selectedParticipant?.subscriber?.name || "",
                  email: selectedParticipant?.subscriber?.email || "",
                  notes: selectedParticipant?.subscriber?.phoneNumber || "",
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ isSubmitting, setFieldValue, values }) => (
                  <Form>
                    <div className="mb-10">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name
                      </label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Akosombo Invasion"
                        value={values.name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs pl-2 pt-2"
                      />
                    </div>
                    <div className="mb-10">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={values.email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs pl-2 pt-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Notes
                      </label>
                      <Field
                        name="notes"
                        type="text"
                        placeholder="Notes"
                        value={values.notes}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="notes"
                        component="div"
                        className="text-red-500 text-xs pl-2 pt-2"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="mt-6">
                <p className="mb-2">Participated Tours</p>
                <div className="flex flex-row gap-5 flex-wrap">
                  {data?.tourSubscriptions?.map((tour: any) => (
                    <div
                      className="px-4 py-2 bg-[#82D0F3] rounded-sm text-sm text-white"
                      key={tour._id}
                    >
                      {tour?.tour?.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button className="mt-4 w-full sm:w-fit bg-[#E73856] hover:bg-red-600 text-white font-normal py-3 px-4 rounded-lg">
                  Delete Participant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </>
  );
};

const ParticipantsPage = () => {
  return <Participants />;
};

export default ParticipantsPage;
