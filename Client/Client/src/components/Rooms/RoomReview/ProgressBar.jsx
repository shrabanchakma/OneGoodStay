import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ label, value }) => {
  return (
    <div className="w-full">
      <div className="text-gray-700 w-full flex justify-between items-center text-[13px]">
        <span>{label}</span>
        <span className="font-medium">{value}/10</span>
      </div>
      <progress
        className="progress w-full "
        value={value * 10}
        max="100"
      ></progress>
    </div>
  );
};

ProgressBar.propTypes = {};

export default ProgressBar;
