import { useState } from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
const Amenity = ({
  amenity,
  handleAmenitySelect,
  handleAmenityRemove,
  selectedAmenities,
  updateSelectedAmenities,
  isSelected,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const setOnMouseEnter = () => {
    setIsHovering(true);
  };
  const setOnMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div
      onClick={() => updateSelectedAmenities(amenity?.label)}
      onMouseEnter={setOnMouseEnter}
      onMouseLeave={setOnMouseLeave}
      className={`h-8 p-1 px-3 flex items-center gap-2 cursor-pointer font-medium  transition-all ease-in-out duration-75 ${
        isHovering ? "bg-neutral-100" : "bg-white"
      }`}
    >
      {isHovering || isSelected ? (
        <RiCheckboxCircleFill className="text-blue-500 text-xl" />
      ) : (
        <RiCheckboxBlankCircleLine className="text-blue-500 text-xl" />
      )}
      <h1>{amenity?.label}</h1>
    </div>
  );
};

export default Amenity;
