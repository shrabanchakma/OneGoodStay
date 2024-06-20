import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getCategoryReviews } from "../../../Api/rooms";
import ProgressBar from "./ProgressBar";
import RatingIndicator from "./RatingIndicator";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import ModalReview from "./ModalReview";
const RoomReviewModal = ({
  isOpen,
  setIsOpen,
  roomId,
  averageRating,
  reviews,
}) => {
  const [reviewCategoryData, setReviewCategoryData] = useState({});
  // get room review data
  useEffect(() => {
    getCategoryReviews(roomId).then((categoryData) =>
      setReviewCategoryData(categoryData)
    );
  }, []);
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
                <button className=" hover:bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center">
                  <RxCross2 size={25} className="text-blue-500  " />
                </button>
                <span className="font-bold text-[17px]">Guest reviews</span>
              </div>
              <div className="py-4">
                <div className="text-2xl font-bold flex items-center gap-2">
                  {averageRating}/10
                  <span>
                    <RatingIndicator rating={averageRating} />
                  </span>
                </div>
                <div className="text-gray-700">
                  Total {reviews.length} reviews
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
              <div className="w-full">
                {/* reviews */}
                {reviews.map((review) => (
                  <ModalReview key={review?._id} />
                ))}
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
