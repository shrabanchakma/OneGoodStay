import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getCategoryReviews, getRoomReviews } from "../../../Api/rooms";
import ProgressBar from "./ProgressBar";
import RatingIndicator from "./RatingIndicator";
import { RxCross2 } from "react-icons/rx";
import ModalReview from "./ModalReview";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
const RoomReviewModal = ({
  isOpen,
  setIsOpen,
  roomId,
  averageRating,
  totalReviews,
}) => {
  const [reviewCategoryData, setReviewCategoryData] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  // console.log("total reviews -->", totalReviews);
  // console.log("total reviews -->", averageRating);
  const dropdownOptions = [
    "Highest guest rating",
    "Lowest guest rating",
    "Most recent",
    "All",
  ];
  const [selectedOption, setSelectedOption] = useState("All");
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen((prev) => !prev);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleMoreReviews = () => {
    setPage((prev) => prev + 1);
  };
  // console.log(page);
  // get reviews
  useEffect(() => {
    getRoomReviews(roomId, page, 3).then((reviewData) =>
      setReviews(reviewData)
    );
  }, [page]);
  // get room review data by categories
  useEffect(() => {
    getCategoryReviews(roomId).then((categoryData) => {
      setReviewCategoryData(categoryData);
    });
    setFilteredReviews(reviews);
  }, [reviews, roomId]);

  // filter reviews
  useEffect(() => {
    let filtered = [];
    if (selectedOption === "All") {
      filtered = reviews;
    } else if (selectedOption === "Highest guest rating") {
      filtered = reviews.filter(
        (review) => review?.ratings["overall satisfaction"] > 3
      );
    } else if (selectedOption === "Lowest guest rating") {
      filtered = reviews.filter(
        (review) => review?.ratings["overall satisfaction"] < 4
      );
    } else {
      filtered = reviews.sort((a, b) => new Date(b?.date) - new Date(a?.date));
    }
    setFilteredReviews(filtered);
  }, [selectedOption]);

  // console.log(reviewCategoryData);
  return (
    <Transition appear show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative w-full z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-full items-center justify-center ">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="h-[50rem] w-[40rem] px-5 py-5  bg-white rounded-xl overflow-y-scroll ">
              <div className="flex items-center gap-2 mb-9">
                <button
                  onClick={closeModal}
                  className=" hover:bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <RxCross2 size={25} className="text-blue-500  " />
                </button>
                <span className="font-bold text-[17px]">Guest reviews</span>
              </div>
              <div className="py-4">
                <div className="text-2xl font-bold flex items-center gap-2">
                  {!isNaN(averageRating)
                    ? `${averageRating}/10`
                    : "No rating yet"}

                  <span>
                    <RatingIndicator rating={averageRating} />
                  </span>
                </div>
                <div className="text-gray-700">
                  {totalReviews
                    ? `Total ${totalReviews} reviews`
                    : "No reviews yet"}
                </div>
              </div>
              <div className="w-full ">
                <ProgressBar
                  label={"Cleanliness"}
                  value={reviewCategoryData?.avg_cleanliness}
                />
                <ProgressBar
                  label={"Staff & service"}
                  value={reviewCategoryData?.avg_staff_service}
                />
                <ProgressBar
                  label={"Amenities"}
                  value={reviewCategoryData?.avg_amenities}
                />
                <ProgressBar
                  label={"Property conditions & facilities"}
                  value={reviewCategoryData?.avg_condition_facilities}
                />
                <ProgressBar
                  label={"Eco-friendliness"}
                  value={reviewCategoryData?.avg_eco_friendliness}
                />
              </div>
              {/* filter */}
              <div className="w-full my-10  ">
                <div className="relative inline-block text-left w-full">
                  <div>
                    <button
                      type="button"
                      className=" flex flex-col justify-center items-start w-full rounded-md border border-gray-300 shadow-sm py-1 px-4    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      onClick={toggleDropdown}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col items-start text-black text-[13px] font-medium ">
                          Sort by
                          <span className="text-gray-700 text-[15px] font-normal">
                            {selectedOption}
                          </span>
                        </div>
                        <FaChevronDown />
                      </div>
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <ul className="py-1" role="none">
                        {dropdownOptions.map((option) => (
                          <li
                            key={option}
                            href="#"
                            className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:text-neutral-100 hover:bg-blue-600"
                            role="menuitem"
                            onClick={() => selectOption(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full">
                {/* reviews */}
                {filteredReviews.map((review) => (
                  <ModalReview key={review?._id} review={review} />
                ))}
                <button
                  onClick={handleMoreReviews}
                  className="text-sky-500 hover:text-sky-600 hover:bg-sky-100 font-bold w-[9rem] mx-auto mb-5 mt-2 border border-gray-700 p-2 rounded-xl flex justify-center items-center"
                >
                  More reviews
                  <FaArrowRight />
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RoomReviewModal;

RoomReviewModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
