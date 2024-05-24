import { useState } from "react";
import PropTypes from "prop-types";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";

const Category = ({ categoryLabel, selectedCategory, setSelectedCategory }) => {
  const [isHovering, setIsHovering] = useState(false);
  const setOnMouseEnter = () => {
    setIsHovering(true);
  };
  const setOnMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div
      onClick={() => setSelectedCategory(categoryLabel)}
      onMouseEnter={setOnMouseEnter}
      onMouseLeave={setOnMouseLeave}
      className={`h-8 p-1 px-3 flex items-center gap-2 cursor-pointer font-medium  transition-all ease-in-out duration-75 ${
        isHovering ? "bg-neutral-100" : "bg-white"
      }`}
    >
      {isHovering || selectedCategory == categoryLabel ? (
        <RiCheckboxCircleFill className="text-blue-500 text-xl" />
      ) : (
        <RiCheckboxBlankCircleLine className="text-blue-500 text-xl" />
      )}
      <h1>{categoryLabel}</h1>
    </div>
  );
};

Category.propTypes = {
  categoryLabel: PropTypes.string,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
};

export default Category;
