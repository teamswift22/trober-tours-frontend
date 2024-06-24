import { useFetchAccommodationQuery } from "@/lib/features/tours/toursApiSlice";
type Location = {
  lat: number;
  lng: number;
};

type Accommodation = {
  place_id: string;
  name: string;
  vicinity: string;
  formatted_phone_number?: string;
  rating?: number;
  price_level?: number;
  photos?: { photo_reference: string }[];
};

type AccommodationFetchProps = {
  location: Location;
  radius?: number;
  apiKey: string | undefined;
  children: (props: {
    accommodations: Accommodation[];
    isLoading: boolean;
    error: any;
  }) => React.ReactNode;
};
const AccommodationFetch: React.FC<AccommodationFetchProps> = ({
  apiKey,
  location,
  radius = 50000,
  children,
}) => {
  const { data, error, isLoading } = useFetchAccommodationQuery({
    location,
    radius,
    type: "lodging",
    apiKey: process.env.NEXT_PUBLIC_PLACES_KEY,
  });
  console.log({ data });
  return children({ accommodations: data, isLoading, error });
};

export default AccommodationFetch;
