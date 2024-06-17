import React from "react";
const RatingIndicator = ({ rating }) => {
  const getRatingIndicator = () => {
    if (rating < 4) {
      return <span className="inline-block">Bad</span>;
    } else if (rating >= 4 && rating < 6) {
      return <span className="inline-block">Medium</span>;
    } else if (rating >= 6 && rating < 7) {
      return <span className="inline-block">Good</span>;
    } else {
      return <span className=" inline-block">Very Good</span>;
    }
  };

  return <div>{getRatingIndicator()}</div>;
};

export default RatingIndicator;
