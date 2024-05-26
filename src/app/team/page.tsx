"use client";

// pages/dashboard.tsx
import Head from "next/head";
import Layout from "@/components/layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FiPhone, FiMail, FiCheckSquare, FiSquare } from "react-icons/fi";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import * as Yup from "yup";

const Team: React.FC = () => {
  const participantSchema = Yup.object().shape({
    name: Yup.string().required("Participant name is required"),
    participantNumber: Yup.string()
      .required("Participant number is required")
      .matches(
        /^\(\+\d{3}\)\s\d{3}\s\d{3}\s\d{3}$/,
        "Invalid phone number format"
      ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    note: Yup.string(),
    role: Yup.string().required("Selecting your role is required."),
  });

  const teamMembers = [
    {
      name: "Kweku Yaw",
      number: "0245 454 584",
      email: "yawk@gmail.com",
      role: "Editor",
    },
    {
      name: "Kweku Yaw",
      number: "0245 454 584",
      email: "yawk@gmail.com",
      role: "Editor",
    },
    {
      name: "Kweku Yaw",
      number: "0245 454 584",
      email: "yawk@gmail.com",
      role: "Editor",
    },
  ];

  return (
    <>
      <Head>
        <title>Team</title>
      </Head>

      <div className="p-10">
        <div className="bg-white rounded-md">
          <Formik
            initialValues={{
              name: "",
              participantNumber: "",
              email: "",
              note: "",
            }}
            validationSchema={participantSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-6 p-4">
                <p className="font-bold">Add Team Members</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
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
                      htmlFor="participantNumber"
                    >
                      Phone Number
                    </label>
                    <div className="mb-4">
                      <div className="relative shadow border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent">
                        <FiPhone className="absolute right-3 top-3 text-gray-400" />
                        <PhoneInput
                          international
                          defaultCountry="GH"
                          value={values.participantNumber}
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
                      htmlFor="role"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Role
                    </label>
                    <Field
                      name="role"
                      as="select"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent ${"
                    >
                      <option value="">Select your role</option>
                      <option value="manager">Manager</option>
                      <option value="tour_guide">Tour Guide</option>
                      <option value="marketing">Marketing</option>
                      <option value="support">Support</option>
                    </Field>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="bg-black h-5/6 w-5/6 rounded-lg"></div>
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 px-4 rounded-lg"
                  >
                    Add Team Member
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="w-full mx-auto bg-white rounded-lg shadow p-4 mt-10">
          <h2 className="text-xl font-bold mb-4">Team Members</h2>
          <div className="hidden md:block">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {teamMembers.map((member, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full">
                        Edit
                      </button>
                      <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="block md:hidden">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Name
                  </p>
                  <p className="text-gray-900">{member.name}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Number
                  </p>
                  <p className="text-gray-900">{member.number}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Email
                  </p>
                  <p className="text-gray-900">{member.email}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Role
                  </p>
                  <p className="text-gray-900">{member.role}</p>
                </div>
                <div className="flex justify-end">
                  <button className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full">
                    Edit
                  </button>
                  <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full ml-2">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const TeamPage = () => {
  return <Layout title="Team" rightContent={<Team />} />;
};

export default TeamPage;
