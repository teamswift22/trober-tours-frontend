"use client";
import React, { SetStateAction, useState, useRef } from "react";
import ImageScrollContainer from "@/components/ImageScrollComponent";

const tourImages = [
  { alt: "Main Tour", index: 1, src: "/WaitlistPageImage.png" },
  { alt: "Tour Gallery", index: 2, src: "/tour.png" },
  { alt: "Tour Gallery", index: 3, src: "/tour2.png" },
  { alt: "Tour Gallery", index: 4, src: "/tour3.png" },
  { alt: "Main Tour", index: 1, src: "/WaitlistPageImage.png" },
  { alt: "Tour Gallery", index: 2, src: "/tour.png" },
  { alt: "Tour Gallery", index: 3, src: "/tour2.png" },
  { alt: "Tour Gallery", index: 4, src: "/tour3.png" },
];

const Media = () => {
  const [activeImage, setActiveImage] = useState(tourImages[0]);

  const setActiveImageFxn = (
    tour: SetStateAction<{ alt: string; index: number; src: string }>
  ) => {
    setActiveImage(tour);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div>
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className="w-full h-80 md:h-112 object-cover rounded-lg mb-4"
        />
        <ImageScrollContainer
          ImageMap={() =>
            tourImages.map((tour, index) => (
              <img
                key={index}
                src={tour.src}
                alt={tour.alt}
                onClick={() => setActiveImageFxn(tour)}
                className="object-cover rounded-lg h-20 w-20 md:h-24 md:min-w-24 hover:cursor-pointer"
              />
            ))
          }
        />
      </div>
    </div>
  );
};

export default Media;
