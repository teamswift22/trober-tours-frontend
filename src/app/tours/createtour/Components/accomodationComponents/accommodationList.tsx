import React from "react";

type Accommodation = {
  place_id: string;
  name: string;
  vicinity: string;
  formatted_phone_number?: string;
  rating?: number;
  price_level?: number;
  photos?: { photo_reference: string }[];
};

type AccommodationListProps = {
  accommodations: Accommodation[];
  apiKey: string | undefined;
};

const AccommodationList: React.FC<AccommodationListProps> = ({
  accommodations,
  apiKey,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {accommodations?.map((accommodation) => (
        <div
          key={accommodation.place_id}
          className="p-4 w-66 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="h-48">
            {accommodation.photos && accommodation.photos.length > 0 && (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${accommodation.photos[0].photo_reference}&key=${apiKey}`}
                alt={accommodation.name}
                className="w-full h-48 object-cover rounded-2xl mb-2"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {accommodation.name}
            </h3>
            <p className="text-xs font-light whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {accommodation.vicinity}
            </p>
            <div className="flex justify-between items-center mt-4">
              <div>
                {accommodation.rating && (
                  <span className="text-gray-500">
                    Rating: {accommodation.rating}
                  </span>
                )}
              </div>
              <div>
                {accommodation.formatted_phone_number && (
                  <button className="flex text-sm text-white bg-[#FA7454] p-2 rounded-md transition-colors duration-300">
                    {accommodation.formatted_phone_number}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationList;
