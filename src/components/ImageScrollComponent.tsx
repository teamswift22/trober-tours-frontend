import React, { useRef } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const ImageScrollContainer = ({
  ImageMap,
}: {
  ImageMap: () => React.ReactNode[];
}) => {
  const scrollContainerRef = useRef(null);
  const scroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const current = scrollContainerRef.current as HTMLElement; // Type assertion

      const scrollAmount =
        direction === "left" ? -current.scrollWidth : current.scrollWidth;
      current.scrollBy({ left: scrollAmount / 2, behavior: "smooth" }); // Scrolls half the width of the container
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-auto w-full gap-4 relative"
    >
      <button
        className="sticky left-0 p-2 text-gray-600 bg-[#53BFEE] rounded-full shadow hover:bg-gray-100 self-center"
        onClick={() => scroll("left")}
      >
        <FiChevronLeft size={24} color="BDBDBD" />
      </button>
      <ImageMap />
      <button
        className="sticky right-0 p-2 text-gray-600 bg-[#53BFEE] rounded-full shadow hover:bg-gray-100 self-center"
        onClick={() => scroll("right")}
      >
        <FiChevronRight size={24} color="BDBDBD" />
      </button>
    </div>
  );
};

export default ImageScrollContainer;
