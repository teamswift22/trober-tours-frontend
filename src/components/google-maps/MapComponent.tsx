"use client";

import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "@/lib/google-maps/script";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 5.614818,
  lng: -0.205874,
};

const MapComponent = ({ locations }: { locations?: any }) => {
  const [map, setMap] = useState<any>(null);
  const { isLoaded } = useGoogleMaps();

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
  }, [map, locations]);

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
  }, [map, locations, fitBounds]);
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
          />
        )}
        {locations.stop.lat && (
          <Marker
            position={{
              lat: locations.stop.lat,
              lng: locations.stop.lng,
            }}
          />
        )}
      </>
    </GoogleMap>
  ) : (
    <div>loading...</div>
  );
};

export default React.memo(MapComponent);
