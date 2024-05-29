"use client";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import PlaceSearch from "@/components/google-maps/PlaceSearch";
import MapComponent from "@/components/google-maps/MapComponent";
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
const Location = ({
  handleSubmit,
  tourDetails,
}: {
  handleSubmit: any;
  tourDetails: any;
}) => {
  const [eta, setEta] = useState({});
  const [stop, setStop] = useState<any>({});
  const [arrayOfStops, setArrayOfStops] = useState<any>([]);
  const [state, dispatch] = useReducer(locationReducer, {
    destination: {},
    startingPoint: {},
  });

  const { toast } = useToast();

  const disableButton = useMemo(() => {
    if (
      Object.keys(state?.destination).length > 0 &&
      Object.keys(state?.startingPoint).length > 0
    ) {
      return false;
    }
    return true;
  }, [state]);

  const handleStartDestinationChange = (place: any) => {
    dispatch({
      type: "startingPoint",
      payload: place,
    });
  };

  const handleEndDestinationChange = (place: any) => {
    dispatch({
      type: "destination",
      payload: place,
    });
  };

  const handleAddStopChange = (place: any) => {
    setStop(place);
  };

  const handleEtaChange = (data: any) => {
    setEta({ distance: data.distance });
  };

  const handleSetStop = async (data: any) => {
    setArrayOfStops((prev: any) => [data, ...prev]);
    setStop({});
  };

  const handleRemoveStop = (stopId: string) => {
    setArrayOfStops((prev: any) => {
      return prev?.filter((stop: any) => stop.id !== stopId);
    });
  };

  const handleAddRoute = async () => {
    try {
      await handleSubmit({
        startingPoint: state.startingPoint,
        destination: state.destination,
        stops: arrayOfStops,
      });
    } catch (error) {
      toast({ title: "Failed to set route", variant: "destructive" });
    }
  };

  const handleSetEdit = (stop: any) => {
    setStop(stop);
  };

  useEffect(() => {
    const startingPoint = tourDetails?.startingPoint;
    const destination = tourDetails?.destination;
    if (tourDetails && startingPoint && destination) {
      dispatch({
        type: "reset",
        payload: {
          startingPoint,
          destination,
        },
      });
    }
    if (tourDetails?.stops?.length > 0) {
      setArrayOfStops(tourDetails?.stops);
    }
  }, [tourDetails]);

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

          <div className="flex items-end gap-x-2 w-full ">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stop
              </label>
              <PlaceSearch
                onPlaceSelect={handleAddStopChange}
                location={stop}
              />
            </div>
            <button
              disabled={Object.keys(stop).length == 0}
              onClick={() => handleSetStop(stop)}
              className="bg-[#FA7454] min-w-28 hover:bg-orange-600 text-white font-normal py-2 px-3 rounded-lg"
            >
              Add Stop
            </button>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-lg w-full sm:w-5/6 p-4">
          <h1>Added stop</h1>
          <div className="mt-6 px-4 space-y-3">
            {arrayOfStops?.map((item: any) => {
              return (
                <div
                  key={item?.place_id}
                  className="flex flex-row w-full justify-between"
                >
                  <div>
                    <p>{item?.name}</p>
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
                      onClick={() => handleRemoveStop(item?.id)}
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
            stops={arrayOfStops}
          />
        </div>
        <button
          onClick={() => handleAddRoute()}
          className="bg-[#FA7454] hover:bg-orange-600 text-white font-normal py-3 rounded-lg w-full sm:w-5/6"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Location;
