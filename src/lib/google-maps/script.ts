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
