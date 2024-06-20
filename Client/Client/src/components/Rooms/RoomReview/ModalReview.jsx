import React from "react";
import PropTypes from "prop-types";
import RatingIndicator from "./RatingIndicator";
import { formatDate, formatDateTwo } from "../../../Api/utils";
import logo from "../../../assets/OneGoodStay-logo.png";
const ModalReview = ({ review }) => {
  // this is review
  console.log(review);
  return (
    <div className="h-auto w-full flex flex-col items-end justify-center border-b pb-5 ">
      <div className="pb-[2px] pt-4 w-full">
        <div className="text-lg font-bold flex items-center gap-2">
          {review.ratings["overall satisfaction"] * 2}/10
          <span>
            <RatingIndicator
              rating={review.ratings["overall satisfaction"] * 2}
            />
          </span>
        </div>
      </div>
      <div className="w-full">{formatDateTwo(review?.date)}</div>
      <div className="w-full flex items-center justify-between  h-10 text-sm text-gray-700">
        <div className="flex items-center ">
          <img src={logo} alt="" className="w-5 inline-block rounded-sm mr-2" />
          <span className="font-medium text-black">Feedback from:</span>{" "}
          {review?.guest?.name}
        </div>
        <div className="pt-5 text-[12px]">Guest Review</div>
      </div>
      <div className="text-[12px] w-[95%] text-start border-l-[1px] pl-5">
        {review?.comment}
      </div>
    </div>
  );
};

ModalReview.propTypes = {
  review: PropTypes.object,
};

export default ModalReview;
