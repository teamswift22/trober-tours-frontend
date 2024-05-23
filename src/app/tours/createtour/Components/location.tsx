"use client";
import React, { useEffect, useReducer, useState } from "react";
import PlaceSearch from "@/components/google-maps/PlaceSearch";
import MapComponent from "@/components/google-maps/MapComponent";
import {
  useAddStopMutation,
  useEditStopMutation,
  useGetAllStopsQuery,
} from "@/lib/features/tours/toursApiSlice";

const stops = [
  { name: "Stop 1", distance: "200km" },
  { name: "Stop 2", distance: "200km" },
  { name: "Stop 3", distance: "200km" },
  { name: "Stop 4", distance: "200km" },
];

const locationReducer = (state: any, action: any) => {
  switch (action.type) {
    case "destination":
      return { ...state, destination: action.payload };
    case "stop":
      return { ...state, stop: action.payload };
    default:
      return state;
  }
};
const Location = ({ tourId }: { tourId: string | null }) => {
  const [addStop] = useAddStopMutation();
  const [editStop] = useEditStopMutation();
  const { data } = useGetAllStopsQuery(tourId);

  console.log(data);

  const [state, dispatch] = useReducer(locationReducer, {
    destination: {},
    stop: {},
  });
  const [eta, setEta] = useState({});
  const handleDestinationChange = (place: any) => {
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

  const handleStopChange = (place: any) => {
    dispatch({
      type: "stop",
      payload: {
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

  const handleAddStop = async (data: any) => {
    try {
      console.log(data);
      const response = await addStop({
        tourId,
        body: { ...data, eta },
      }).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(state);
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
            <PlaceSearch onPlaceSelect={handleDestinationChange} />
          </div>
          <div>
            <label
              htmlFor="tourName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              End Destination
            </label>
            <PlaceSearch onPlaceSelect={handleStopChange} />
          </div>

          <div className="flex justify-end mt-10">
            <button
              className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 px-3 rounded-lg sm:w-1/3"
              onClick={() => handleAddStop(state)}
            >
              Add Stop
            </button>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-lg w-full sm:w-5/6 p-4">
          <h1>Added Stops</h1>
          <div className="mt-6 px-4">
            {data?.map((item: any) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-row w-full justify-between"
                >
                  <div>
                    <p>{item.stop.formatted_address}</p>
                    <p className="text-[#BDBDBD] text-sm">
                      {item.eta.distance.text}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-[#82D0F3] px-2 sm:px-4 py-1 rounded-full text-sm text-white h-fit">
                      Edit
                    </button>
                    <button className="bg-[#FDC3B5] px-2 sm:px-4 py-1 rounded-full text-sm text-white h-fit">
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
          <MapComponent locations={state} handleEtaChange={handleEtaChange} />
        </div>
        <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg w-full sm:w-5/6">
          Next
        </button>
      </div>
    </div>
  );
};

export default Location;
