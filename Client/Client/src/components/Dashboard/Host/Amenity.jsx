import { useState } from "react";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
const Amenity = ({ amenity, handleAmenitySelect, handleAmenityRemove }) => {
  const [isHovering, setIsHovering] = useState(false);
  const setOnMouseEnter = () => {
    setIsHovering(true);
  };
  const setOnMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div
      onMouseEnter={setOnMouseEnter}
      onMouseLeave={setOnMouseLeave}
      className={`h-8 p-1 px-3 flex items-center gap-2 cursor-pointer font-medium  transition-all ease-in-out duration-75 ${
        isHovering ? "bg-neutral-100" : "bg-white"
      }`}
    >
      <RiCheckboxBlankCircleLine className="text-blue-500" />
      <h1>{amenity?.label}</h1>
    </div>
  );
};

export default Amenity;
