import React, { useState } from "react";
import PropTypes from "prop-types";

const Rating = ({ label, handleRatings, currentRating }) => {
  const totalRating = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className=" flex flex-col justify-start items-start ">
      <div htmlFor="rating" className="mb-1 ">
        <span>{label}</span>
      </div>
      <div className=" flex items-center justify-center gap-2  my-2 ">
        {totalRating.map((rating) => (
          <div
            key={rating}
            onClick={() => handleRatings(label, rating)}
            className={`w-12 h-12 flex items-center justify-center  rounded-[50%] border bg-neutral-100  hover:bg-sky-600 active:bg-sky-700 cursor-pointer relative ${
              rating <= currentRating
                ? " bg-sky-600 text-white  hover:text-white"
                : "text-sky-600 hover:text-white "
            }transition-colors ease-in-out duration-100 `}
          >
            <span>{rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

Rating.propTypes = {};

export default Rating;
