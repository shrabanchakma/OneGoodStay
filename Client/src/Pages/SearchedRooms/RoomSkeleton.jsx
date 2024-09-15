import React from "react";
import PropTypes from "prop-types";

const roomSkeleton = (props) => {
  return (
    <div className="flex w-[28rem] gap-4 ">
      <div className="skeleton h-32 w-1/2"></div>
      <div className="w-1/2 space-y-2">
        <div className="skeleton h-3 w-40"></div>
        <div className="skeleton h-3 w-24"></div>
      </div>
    </div>
  );
};

roomSkeleton.propTypes = {};

export default roomSkeleton;
