import axios from "axios";
import { useLoadScript } from "@react-google-maps/api";

const placeLibraries: any = ["places", "geometry"];

export const useGoogleMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_PLACES_KEY as string,
    libraries: placeLibraries,
  });

  return { isLoaded };
};

export const reveseGeocoding = async (lat: number, lng: number) => {
  await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_PLACES_KEY}`
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
