"use client";
import React, { useReducer } from "react";
import PlaceSearch from "@/components/google-maps/PlaceSearch";
import MapComponent from "@/components/google-maps/MapComponent";

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
const Location = () => {
  const [state, dispatch] = useReducer(locationReducer, {
    destination: {},
    stop: {},
  });
  const handleDestinationChange = (place: any) => {
    dispatch({ type: "destination", payload: place });
  };

  const handleStopChange = (place: any) => {
    dispatch({ type: "stop", payload: place });
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
              Set Destination
            </label>
            <PlaceSearch onPlaceSelect={handleDestinationChange} />
          </div>
          <div>
            <label
              htmlFor="tourName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Add Stops
            </label>
            <PlaceSearch onPlaceSelect={handleStopChange} />
          </div>

          <div className="flex justify-end mt-10">
            <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 px-3 rounded-lg sm:w-1/3">
              Set Destination
            </button>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-lg w-full sm:w-5/6 p-4">
          <h1>Added Stops</h1>
          <div className="mt-6 px-4">
            {stops.map((item) => {
              return (
                <div
                  key={item.name}
                  className="flex flex-row w-full justify-between"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-[#BDBDBD] text-sm">{item.distance}</p>
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
          <MapComponent locations={state} />
        </div>
        <button className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg w-full sm:w-5/6">
          Next
        </button>
      </div>
    </div>
  );
};

export default Location;
