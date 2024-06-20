import React from "react";
const RatingIndicator = ({ rating }) => {
  const getRatingIndicator = () => {
    if (rating < 4) {
      return "Bad";
    } else if (rating >= 4 && rating < 6) {
      return "Medium";
    } else if (rating >= 6 && rating < 7) {
      return "Good";
    } else {
      return "Very good";
    }
  };

  return <div>{getRatingIndicator()}</div>;
};

export default RatingIndicator;
