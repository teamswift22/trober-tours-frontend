"use client";
import React, { useMemo, useReducer, useState } from "react";
import PlaceSearch from "@/components/google-maps/PlaceSearch";
import MapComponent from "@/components/google-maps/MapComponent";
import {
  useAddStopMutation,
  useDeleteStopMutation,
  useEditStopMutation,
  useEditTourMutation,
  useGetAllStopsQuery,
} from "@/lib/features/tours/toursApiSlice";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const locationReducer = (state: any, action: any) => {
  switch (action.type) {
    case "startingPoint":
      return { ...state, startingPoint: action.payload };
    case "destination":
      return { ...state, destination: action.payload };
    case "reset":
      return action.payload;
    default:
      return state;
  }
};
const Location = ({ handleSubmit }: { handleSubmit: any }) => {
  const query = useSearchParams();
  const tourId = useMemo(() => query.get("id"), []);
  const [addStop] = useAddStopMutation();
  const [editStop] = useEditStopMutation();
  const [deleteStop] = useDeleteStopMutation();
  const [eta, setEta] = useState({});
  const [stops, setStops] = useState<any>({});
  const [editStopId, setEditStopId] = useState("");
  const [state, dispatch] = useReducer(locationReducer, {
    destination: {},
    startingPoint: {},
  });

  const { data } = useGetAllStopsQuery(tourId);
  const { toast } = useToast();

  const disableButton = useMemo(() => {
    if (
      Object.keys(state.destination).length > 0 &&
      Object.keys(state.startingPoint).length > 0
    ) {
      return false;
    }
    return true;
  }, [state]);

  const handleStartDestinationChange = (place: any) => {
    dispatch({
      type: "startingPoint",
      payload: {
        formatted_address: place.formatted_address,
        lat: place.lat,
        lng: place.lng,
        name: place.name,
      },
    });
  };

  const handleEndDestinationChange = (place: any) => {
    dispatch({
      type: "destination",
      payload: {
        formatted_address: place.formatted_address,
        lat: place.lat,
        lng: place.lng,
        name: place.name,
      },
    });
  };

  const handleAddStopChange = (place: any) => {
    setStops({
      stop: {
        formatted_address: place.formatted_address,
        lat: place.lat,
        lng: place.lng,
        name: place.name,
      },
    });
  };

  const handleEtaChange = (data: any) => {
    setEta({ distance: data.distance });
  };

  const handleSetStop = async (data: any) => {
    try {
      if (editStopId) {
        const response = await editStop({
          stopId: editStopId,
          body: { ...data },
        }).unwrap();
        toast({
          title: "Stop Edited",
          description: "Stop edited successfully",
        });
      } else {
        const response = await addStop({
          tourId,
          body: { ...data },
        }).unwrap();
        toast({
          title: "Stop Added",
          description: "Stop added successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  const handleAddRoute = async () => {
    try {
      handleSubmit({
        startingPoint: state.startingPoint,
        destination: state.destination,
      });
      toast({ title: "Added route" });
    } catch (error) {
      toast({ title: "Failed to set route", variant: "destructive" });
    }
  };

  const handleSetEdit = (stop: any) => {
    setStops(stop);
    setEditStopId(stop._id);
  };

  console.log(stops);
  const handleDeleteStop = async (stopId: string) => {
    try {
      await deleteStop(stopId).unwrap();
    } catch (error) {}
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div>
        <div className="space-y-6 mt-10 w-full sm:w-5/6">
          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Start Destination
            </label>
            <PlaceSearch
              onPlaceSelect={handleStartDestinationChange}
              location={state.startingPoint}
            />
          </div>
          <div>
            <label
              htmlFor="tourName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              End Destination
            </label>
            <PlaceSearch
              onPlaceSelect={handleEndDestinationChange}
              location={state.destination}
            />
          </div>
          <div className="flex justify-end mt-10">
            <button
              className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 px-3 rounded-lg sm:w-1/3"
              onClick={() => handleAddRoute()}
              disabled={disableButton}
            >
              Set Route
            </button>
          </div>
          <div className="flex items-end gap-x-2 w-full ">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stop
              </label>
              <PlaceSearch
                onPlaceSelect={handleAddStopChange}
                location={stops.stop}
              />
            </div>
            <button
              onClick={() => handleSetStop(stops)}
              className="bg-[#FA7454] min-w-28 hover:bg-orange-600 text-white font-normal py-2 px-3 rounded-lg"
            >
              Add Stop
            </button>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-lg w-full sm:w-5/6 p-4">
          <h1>Added Stops</h1>
          <div className="mt-6 px-4 space-y-3">
            {data?.map((item: any) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-row w-full justify-between"
                >
                  <div>
                    <p>{item.stop.formatted_address}</p>
                    {/* <p className="text-[#BDBDBD] text-sm">
                      {item?.eta?.distance.text}
                    </p> */}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-[#82D0F3] px-2 sm:px-4 py-1 rounded-full text-sm text-white h-fit"
                      onClick={() => handleSetEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#FDC3B5] px-2 sm:px-4 py-1 rounded-full text-sm text-white h-fit"
                      onClick={() => handleDeleteStop(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="h-5/6 w-5/6 rounded-lg">
          <MapComponent
            locations={state}
            handleEtaChange={handleEtaChange}
            stops={data}
          />
        </div>
        <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg w-full sm:w-5/6">
          Next
        </button>
      </div>
    </div>
  );
};

export default Location;
