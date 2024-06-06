"use client";

// pages/dashboard.tsx
import Head from "next/head";
import Layout from "@/components/layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FiPhone, FiMail, FiCheckSquare, FiSquare } from "react-icons/fi";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import * as Yup from "yup";
import {
  useAddAgencyMemberMutation,
  useGetAgencyMembersQuery,
  useUpdateAgencyMemberMutation,
} from "@/lib/features/agency-member/agencyMemeberSlice";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Team: React.FC = () => {
  const participantSchema = Yup.object().shape({
    fullName: Yup.string().required("Participant name is required"),
    phoneNumber: Yup.string().required("Participant number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    note: Yup.string(),
    role: Yup.string().required("Selecting your role is required."),
  });

  const { data: agencyMembers } = useGetAgencyMembersQuery({});
  const [addMemeber] = useAddAgencyMemberMutation();
  const [editMember] = useUpdateAgencyMemberMutation();
  const [memberToUpdate, setMemberToUpdate] = useState<any>({});
  const { toast } = useToast();

  return (
    <>
      <Head>
        <title>Team</title>
      </Head>

      <div className="p-10">
        <div className="bg-white rounded-md">
          <Formik
            initialValues={{
              fullName: memberToUpdate?.fullName || "",
              phoneNumber: memberToUpdate?.phoneNumber || "",
              email: memberToUpdate?.email || "",
              role: memberToUpdate?.role || "",
            }}
            enableReinitialize
            validationSchema={participantSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (memberToUpdate?._id) {
                  await editMember({
                    id: memberToUpdate._id,
                    data: values,
                  }).unwrap();
                  toast({ title: "Member edited" });
                  setMemberToUpdate({});
                } else {
                  await addMemeber(values).unwrap();
                  setMemberToUpdate({});
                  toast({ title: "Member added" });
                }
                setSubmitting(false);
              } catch (error) {
                toast({ title: "Failed", variant: "destructive" });
              }
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => {
              return (
                <Form className="space-y-6 p-4" id="teamMemberForm">
                  <p className="font-bold">Add Team Members</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name
                      </label>
                      <Field
                        name="fullName"
                        type="text"
                        placeholder="Akosombo Invasion"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="fullName"
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
                        <option value="tour guide">Tour Guide</option>
                        <option value="marketing">Marketing</option>
                        <option value="support">Support</option>
                      </Field>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full md:w-auto bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 px-4 rounded-lg">
                        {memberToUpdate?._id
                          ? "Edit Team Member"
                          : "Add Team Member"}
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            {!memberToUpdate?._id
                              ? "You are adding the following individual to your agency."
                              : "You are editing the information of the selected team member"}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            type="submit"
                            form="teamMemberForm"
                            className="bg-[#FA7454] hover:bg-orange-600"
                          >
                            {memberToUpdate?._id ? "Edit Member" : "Add Member"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Form>
              );
            }}
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
                {agencyMembers?.results.map((member: any) => (
                  <tr key={member._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member?.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member?.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member?.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setMemberToUpdate(member)}
                        className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full"
                      >
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
            {agencyMembers?.results?.map((member: any) => (
              <div
                key={member?._id}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Name
                  </p>
                  <p className="text-gray-900">{member?.fullName}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Number
                  </p>
                  <p className="text-gray-900">{member?.phoneNumber}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Email
                  </p>
                  <p className="text-gray-900">{member?.email}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Role
                  </p>
                  <p className="text-gray-900">{member?.role}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setMemberToUpdate(member)}
                    className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full"
                  >
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
