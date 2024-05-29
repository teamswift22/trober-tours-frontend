"use client";

import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useGoogleMaps } from "@/lib/google-maps/script";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 5.614818,
  lng: -0.205874,
};

const MapComponent = ({
  locations,
  handleEtaChange,
  stops,
}: {
  locations?: any;
  handleEtaChange: (place: any) => void;
  stops?: any;
}) => {
  const [map, setMap] = useState<any>(null);
  const [directions, setDirections] = useState<any>(null);
  const { isLoaded } = useGoogleMaps();

  const calculateDirections = () => {
    if (
      isLoaded &&
      map &&
      locations?.startingPoint.lat &&
      locations?.destination.lat
    ) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = new window.google.maps.LatLng(
        locations.startingPoint.lat,
        locations.startingPoint.lng
      );
      const destination = new window.google.maps.LatLng(
        locations.destination.lat,
        locations.destination.lng
      );
      const travelMode = window.google.maps.TravelMode.DRIVING; // Change travel mode if needed
      const waypointsStops = stops?.map((waypoint: any) => {
        return {
          location: { lat: waypoint.lat, lng: waypoint.lng },
        };
      });

      directionsService.route(
        {
          origin,
          destination,
          travelMode,
          waypoints: waypointsStops,
        },
        (response, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(response);
            handleEtaChange(response?.routes[0].legs[0]);
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    }
  };

  const fitBounds = useCallback(() => {
    if (map && locations?.startingPoint.lat && locations?.destination.lat) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(
          locations.startingPoint.lat,
          locations.startingPoint.lng
        )
      );
      bounds.extend(
        new window.google.maps.LatLng(
          locations.destination.lat,
          locations.destination.lng
        )
      );
      map.fitBounds(bounds);
    }
    calculateDirections();
  }, [locations]);

  const onLoad = useCallback(
    function callback(map: any) {
      if (window.google) {
        // This is just an example of getting and using the map instance

        if (locations?.startingPoint.lat && locations?.destination.lat) {
          fitBounds();
        } else {
          const bounds = new window.google.maps.LatLngBounds(center);
          map.fitBounds(bounds);
        }
      }

      setMap(map);
    },
    [isLoaded]
  );

  const onUnmount = React.useCallback(
    function callback() {
      setMap(null);
    },
    [isLoaded]
  );

  useEffect(() => {
    if (map && locations) {
      fitBounds();
    }
  }, [locations, stops]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        {locations.startingPoint.lat && (
          <Marker
            position={{
              lat: locations.startingPoint.lat,
              lng: locations.startingPoint.lng,
            }}
          />
        )}
        {locations.destination.lat && (
          <Marker
            position={{
              lat: locations.destination.lat,
              lng: locations.destination.lng,
            }}
          />
        )}
        {stops?.map((stop: any) => (
          <Marker
            key={stop?.name}
            position={{ lat: stop?.lat, lng: stop?.lng }}
          />
        ))}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ draggable: true, markerOptions: { visible: false } }}
          />
        )}
      </>
    </GoogleMap>
  ) : (
    <div className="bg-blue-600 h-full w-full" />
  );
};

export default React.memo(MapComponent);
