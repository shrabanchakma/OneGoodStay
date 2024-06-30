import PropTypes from "prop-types";
import RatingIndicator from "./RatingIndicator";
import { formatDateTwo } from "../../../Api/utils";
const RoomReviewBox = ({ review, setIsModalOpen }) => {
  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  };
  const averageRating = review?.ratings?.["overall satisfaction"] * 2;
  // review box
  return (
    <div className="h-[30vh] w-[330px] sm:w-[350px] md:w-[400px] bg-white rounded-lg border-[1px] border-gray-400 space-y-4 ">
      <div className="p-8">
        {/* review heading and description */}
        <div>
          <h1 className="font-medium text-black ">
            {averageRating}/10 <RatingIndicator rating={averageRating} />
          </h1>
          <p className="text-sm lg:text-[12px]">
            {truncateText(review?.comment, 160)}
          </p>
          <p
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="text-blue-500 hover:cursor-pointer text-[15px]"
          >
            Read more
          </p>
        </div>
        <div>
          {/* user name and review date */}
          <h1 className="font-medium text-sm ">{review?.guest?.name}</h1>
          <p className="text-[12px] text-gray-700">
            {formatDateTwo(review?.date)}
          </p>
        </div>
      </div>
    </div>
  );
};
RoomReviewBox.propTypes = {
  review: PropTypes.object,
  setIsModalOpen: PropTypes.func,
};
export default RoomReviewBox;
