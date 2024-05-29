"use client";

import { useEffect, useRef, useState } from "react";
import { useGoogleMaps } from "@/lib/google-maps/script";

const options = {
  componentRestrictions: { country: "gh" },
};

const PlaceSearch = ({
  onPlaceSelect,
  location,
}: {
  onPlaceSelect?: any;
  location?: any;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [searchValue, setSearchValue] = useState<string | undefined>("");

  const { isLoaded } = useGoogleMaps();

  const handlePlaceChange = (place: google.maps.places.PlaceResult | null) => {
    const placeInfo = {
      lat: place?.geometry?.location?.lat(),
      lng: place?.geometry?.location?.lng(),
      name: place?.name,
      formatted_address: place?.formatted_address,
      id: place?.place_id,
    };
    onPlaceSelect(placeInfo);
    setSearchValue(place?.name);
  };

  useEffect(() => {
    setSearchValue(location?.name || "");
  }, [location]);

  useEffect(() => {
    if (window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current as HTMLInputElement,
        options
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        handlePlaceChange(place as google.maps.places.PlaceResult);
      });
    }
  }, [isLoaded]);

  return (
    <input
      ref={inputRef}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
    />
  );
};

export default PlaceSearch;
