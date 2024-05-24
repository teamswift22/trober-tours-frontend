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
}: {
  locations?: any;
  handleEtaChange: (place: any) => void;
}) => {
  const [map, setMap] = useState<any>(null);
  const [directions, setDirections] = useState<any>(null);
  const { isLoaded } = useGoogleMaps();

  const calculateDirections = () => {
    if (isLoaded && map && locations?.destination.lat && locations?.stop.lat) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = new window.google.maps.LatLng(
        locations.destination.lat,
        locations.destination.lng
      );
      const destination = new window.google.maps.LatLng(
        locations.stop.lat,
        locations.stop.lng
      );
      const travelMode = window.google.maps.TravelMode.DRIVING; // Change travel mode if needed

      directionsService.route(
        {
          origin,
          destination,
          travelMode,
          waypoints: [
            {
              location: { lat: 6.2550236, lng: -0.1167512 },
              stopover: true,
            },
          ],
          optimizeWaypoints: true,
        },
        (response, status) => {
          console.log({ response });
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
    if (map && locations?.destination.lat && locations?.stop.lat) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(
          locations.destination.lat,
          locations.destination.lng
        )
      );
      bounds.extend(
        new window.google.maps.LatLng(locations.stop.lat, locations.stop.lng)
      );
      map.fitBounds(bounds);
    }
    calculateDirections();
  }, [locations]);

  const onLoad = useCallback(
    function callback(map: any) {
      if (window.google) {
        // This is just an example of getting and using the map instance
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
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
  }, [locations]);

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
        {locations.destination.lat && (
          <Marker
            position={{
              lat: locations.destination.lat,
              lng: locations.destination.lng,
            }}
            // draggable
            // onDragEnd={(e) => {
            //   const newLat = e.latLng.lat();
            //   const newLng = e.latLng.lng();
            //   reveseGeocoding(newLat, newLng).then((res) => console.log(res));
            //   // console.log(e.latLng.lat(), e.latLng.lng());
            // }}
          />
        )}
        <Marker
          position={{
            lat: 6.016497,
            lng: 0.0230409,
          }}
          // draggable
        />
        {locations.stop.lat && (
          <Marker
            position={{
              lat: locations.stop.lat,
              lng: locations.stop.lng,
            }}
            // draggable
          />
        )}
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
