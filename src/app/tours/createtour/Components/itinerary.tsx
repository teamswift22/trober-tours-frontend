"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useAddActivityMutation,
  useEditActivityMutation,
  useGetActivitiesQuery,
} from "@/lib/features/tours/toursApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

const validationSchema = Yup.object({
  name: Yup.string().required("Itinerary name is required"),
  notes: Yup.string().required("Activity description is required"),
  date: Yup.date().required("Start date is required"),
  location: Yup.string().required("Location is required"),
});

const Itinerary = ({
  formId,
  tourDetails,
  getActiveTab,
}: {
  formId: string | null;
  tourDetails: any;
  getActiveTab: (tab: any) => void;
}) => {
  const [addActivity] = useAddActivityMutation();
  const [editActivity] = useEditActivityMutation();
  const { data: itineray } = useGetActivitiesQuery(formId);
  const [selectedItineray, setSelectedItineray] = useState<any>(null);
  const [addedItineray, setAddedItineray] = useState<any>([]);
  const [existingItinearyIds, setExistingItinearyIds] = useState<string[]>([]);
  const { toast } = useToast();

  const stops = useMemo(() => {
    const stops = tourDetails?.stops || [];
    const start = tourDetails?.startingPoint;
    const end = tourDetails?.destination || [];
    return [start, ...stops, end];
  }, [tourDetails]);

  const allItineray = useMemo(() => {
    if (itineray) {
      return [...addedItineray, ...itineray];
    } else {
      return addedItineray;
    }
  }, [addedItineray, itineray]);

  const handleItinerayReset = (itinerayData: any) => {
    setSelectedItineray(itinerayData);
  };

  useEffect(() => {
    if (itineray) {
      setExistingItinearyIds(itineray.map((item: any) => item._id));
    }
  }, [itineray]);

  const handleDelete = async (id: string) => {
    try {
      if (existingItinearyIds.includes(id)) {
        await editActivity({
          activityId: id,
          body: { deleted: true },
        }).unwrap();
      } else {
        setAddedItineray((prev: any) =>
          prev.filter((item: any) => item._id !== id)
        );
      }
      toast({ title: "Itinerary Deleted" });
    } catch (error) {
      toast({ title: "Failed to delete itinerary" });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Formik
          initialValues={{
            name: selectedItineray?.name || "",
            notes: selectedItineray?.notes || "",
            date:
              selectedItineray?.date?.split("T")[0] ||
              tourDetails?.startDate.split("T")[0],
            location: selectedItineray?.location || "",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              if (selectedItineray) {
                if (existingItinearyIds?.includes(selectedItineray?._id)) {
                  await editActivity({
                    activityId: selectedItineray?._id,
                    body: values,
                  }).unwrap();
                } else {
                  console.log("running now");
                  setAddedItineray((prev: any) => {
                    return prev.map((item: any) => {
                      if (item._id === selectedItineray?._id) {
                        return { ...item, ...values };
                      } else {
                        return item;
                      }
                    });
                  });
                }
                setSelectedItineray(null);
                toast({ title: "Itinerary edited" });
              } else {
                const newId = uuidv4();
                setAddedItineray((prev: any) => [
                  ...prev,
                  { tourId: formId, ...values, _id: newId },
                ]);
                setSelectedItineray(null);
                resetForm();
                toast({ title: "Itinerary added" });
              }
              setSubmitting(false);
            } catch (error) {
              toast({ title: "Failed to added itinerary" });
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className=" mt-0 sm:mt-10 space-y-3 bg-white p-6 rounded-md shadow-sm w-full sm:w-5/6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Itinerary Name
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

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Activity Description
                </label>
                <Field
                  as="textarea"
                  name="notes"
                  className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="notes"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Location
                </label>
                <Field
                  name="location"
                  as="select"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a location</option>
                  {stops?.map((item: any) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Date
                </label>
                <Field
                  type="date"
                  name="date"
                  min={tourDetails?.startDate.split("T")[0]}
                  max={tourDetails?.endDate.split("T")[0]}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 mt-10">
                {selectedItineray && (
                  <button
                    type="button"
                    className="text-destructive font-medium"
                    onClick={() => setSelectedItineray(null)}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#FA7454] hover:bg-orange-600 text-white font-thin py-3 rounded-lg w-full sm:w-1/3"
                >
                  {selectedItineray ? "Edit Activity" : "Add Activity"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <div className="mt-10 bg-white rounded-lg p-4 h-fit max-h-[350px] overflow-auto w-full sm:w-5/6 sm:mb-14">
          <h1 className="font-semibold">Added Itinerary</h1>
          <div className="mt-6 px-4">
            {allItineray?.map((item: any) => (
              <div
                key={item?._id}
                className="flex flex-row justify-between items-center mb-4"
              >
                <div>
                  <p>{item?.name}</p>
                  <p className="text-[#BDBDBD] text-sm">{item?.distance}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-[#82D0F3] px-4 py-1 rounded-full text-sm text-white"
                    onClick={() => handleItinerayReset(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#FDC3B5] px-4 py-1 rounded-full text-sm text-white"
                    onClick={() => handleDelete(item?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={async () => {
            try {
              if (addedItineray?.length) {
                await addActivity({
                  tourId: formId,
                  body: addedItineray,
                }).unwrap();
              }
              toast({ title: "Itinerary saved" });
              getActiveTab("Transport");
            } catch (error) {
              toast({ title: "Failed to save itinerary" });
            }
          }}
          className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg w-full sm:w-5/6 mt-6 sm:mt-0"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Itinerary;
