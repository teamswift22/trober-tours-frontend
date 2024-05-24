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

const previousParticipantsArray = [
  {
    id: 1,
    text: "Previous Participant 1",
    email: "participant1@gmail.com",
    number: "+233 245 678 9019",
    selected: true,
  },
  {
    id: 2,
    text: "Previous Participant 2",
    email: "participant2@gmail.com",
    number: "+233 245 678 9019",
    selected: false,
  },
  {
    id: 3,
    text: "Previous Participant 3",
    email: "participant3@gmail.com",
    number: "+233 245 678 9019",
    selected: false,
  },
  {
    id: 4,
    text: "Previous Participant 4",
    email: "participant4@gmail.com",
    number: "+233 245 678 9019",
    selected: false,
  },
  {
    id: 5,
    text: "Previous Participant 5",
    email: "participant5@gmail.com",
    number: "+233 245 678 9019",
    selected: false,
  },
  {
    id: 6,
    text: "Previous Participant 6",
    email: "participant6@gmail.com",
    number: "+233 245 678 9019",
    selected: false,
  },
  {
    id: 7,
    text: "Previous Participant 7",
    email: "participant7@gmail.com",
    number: "+233 245 678 9019",
    selected: false,
  },
];

const Participants: React.FC = () => {
  const [previousParticipants, setPreviousParticipants] = useState(
    previousParticipantsArray
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(
    previousParticipants[0]
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    notes: Yup.string(),
  });

  return (
    <>
      <Head>
        <title>Subscribers</title>
      </Head>
      <div className="grid grid-cols-2 px-10">
        <div className="bg-white rounded-lg p-4 h-fit w-full sm:w-5/6 mb-4">
          <h3 className="text-xl font-semibold mb-6">Previous Participants</h3>
          <ScrollArea className="max-h-[500px] overflow-auto px-4">
            {/* Todo items */}
            {previousParticipants.map((participant) => (
              <div
                key={participant.id}
                className={`flex items-center justify-between mb-6 rounded-md p-2 ${
                  participant.id === selectedParticipant?.id && "bg-[#25ADE9]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex">
                    {participant.selected ? (
                      <FiCheckSquare
                        size={20}
                        className="text-green-500 mr-4 hover: cursor-pointer"
                      />
                    ) : (
                      <FiSquare
                        size={20}
                        className="mr-4 hover: cursor-pointer"
                      />
                    )}
                    <div
                      onClick={() => {
                        setSelectedParticipant(participant);
                      }}
                    >
                      <p className="">{participant.text}</p>
                      <p className="text-gray-500 text-sm font-light">
                        {participant.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm font-light">
                    {participant.number}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex flex-col justify-between items-start px-6 mt-2">
            <button
              onClick={() => {
                setModalIsOpen(true);
              }}
              className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 px-1 text-sm rounded-lg w-full sm:w-3/6"
            >
              Send Notification
            </button>
          </div>
        </div>

        <div className="flex justify-end h-fit">
          <div className="bg-white p-10 rounded-md w-full sm:w-5/6">
            <Formik
              initialValues={{
                name: "",
                email: "",
                notes: "",
              }}
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
                      // TODO:Check how to handle this
                      value={selectedParticipant?.text}
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
                      placeholder="Akosombo Invasion"
                      // TODO:Check how to handle this
                      value={selectedParticipant?.email}
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
                      placeholder="Akosombo Invasion"
                      // TODO:Check how to handle this
                      value={selectedParticipant?.number}
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
                <div className="px-4 py-2 bg-[#82D0F3] rounded-sm text-sm text-white">
                  Akosombo Invasion
                </div>
                <div className="px-4 py-2 bg-[#82D0F3] rounded-sm text-sm text-white">
                  Akosombo Invasion
                </div>
                <div className="px-4 py-2 bg-[#82D0F3] rounded-sm text-sm text-white">
                  Akosombo Invasion
                </div>
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
      <NotificationModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </>
  );
};

const ParticipantsPage = () => {
  return <Layout title="Participants" rightContent={<Participants />} />;
};

export default ParticipantsPage;
