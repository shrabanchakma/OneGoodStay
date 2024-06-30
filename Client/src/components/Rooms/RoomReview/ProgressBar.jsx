import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ label, value }) => {
  const progressValue = value && value.toFixed(2);
  return (
    <div className="w-full">
      <div className="text-gray-700 w-full flex justify-between items-center text-[13px]">
        <span>{label}</span>
        <span className="font-medium">{progressValue}/10</span>
      </div>
      <progress
        className="progress w-full "
        value={value * 10}
        max="100"
      ></progress>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
};

export default ProgressBar;
