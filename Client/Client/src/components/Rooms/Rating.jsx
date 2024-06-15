import React, { useState } from "react";
import PropTypes from "prop-types";

const Rating = ({ label, handleRatings, currentRating }) => {
  const totalRating = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="w-full">
      <label htmlFor="rating" className="mb-1">
        {label}
      </label>
      <div className="w-full flex items-center justify-start gap-1  my-2 ">
        {totalRating.map((rating) => (
          <div
            key={rating}
            onClick={() => handleRatings(label, rating)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border bg-neutral-100  hover:bg-sky-600 active:bg-sky-700 cursor-pointer relative ${
              rating <= currentRating
                ? " bg-sky-600 text-white  hover:text-white"
                : "text-sky-600 hover:text-white "
            }transition-colors ease-in-out duration-100 `}
          >
            {rating}
          </div>
        ))}
      </div>
    </div>
  );
};

Rating.propTypes = {};

export default Rating;
