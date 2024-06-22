"use client";

import { useEffect, useRef, useState } from "react";
import { useGoogleMaps } from "@/lib/google-maps/script";
import { useField, useFormikContext } from "formik";

const options = {
  componentRestrictions: { country: "gh" },
};

const PlaceSearch = ({
  onPlaceSelect,
  location,
  field,
  disabled = false,
}: {
  onPlaceSelect?: any;
  location?: any;
  field?: any;
  disabled?: boolean | undefined;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

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
    setSearchValue(place?.name || "");
  };

  useEffect(() => {
    location?.name
      ? setSearchValue(location?.name || "")
      : setSearchValue(field?.value.name || "");
  }, [field?.value, location]);

  useEffect(() => {
    if (isLoaded && window.google) {
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
      disabled={disabled}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
    />
  );
};

export default PlaceSearch;
