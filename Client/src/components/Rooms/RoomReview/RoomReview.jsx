import { Swiper, SwiperSlide } from "swiper/react";
import RoomReviewBox from "./RoomReviewBox";
import ContainerTwo from "../../Shared/ContainerTwo";
import { useEffect, useState } from "react";
import {
  CiCircleChevRight,
  CiCircleChevLeft,
  CiCircleInfo,
} from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { BiSad } from "react-icons/bi";
import axiosSecure from "../../../Api";
import { getAverageRatings, getRoomReviews } from "../../../Api/rooms";
import RatingIndicator from "./RatingIndicator";
import RoomReviewModal from "./RoomReviewModal";
import { getIndicatorColor } from "../../../Api/utils";
const RoomReview = ({ room }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRatings, setAverageRatings] = useState(0);
  const [indicatorColor, setIndicatorColor] = useState("text-black");
  const [totalRatings, setTotalRatings] = useState(0);
  const handleMouseEnter = () => {
    setIsVisible(true);
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  const handleModalButton = () => {
    setIsModalOpen(true);
  };
  const swiperBreakpoints = {
    320: { slidesPerView: 1 },
    425: { slidesPerView: 1.1 },
    768: { slidesPerView: 1.7 },
    1024: { slidesPerView: 2.1 },
    1538: { slidesPerView: 2.1 },
  };

  useEffect(() => {
    getRoomReviews(room?._id, 1, 6).then((reviewData) =>
      setReviews(reviewData)
    );
    getAverageRatings(room?._id).then((data) => {
      console.log("average ratings is -->", data);
      setTotalRatings(data?.totalRatings);
      setAverageRatings(data?.averageRatings);
      getIndicatorColor(data?.averageRatings, setIndicatorColor, false);
    });
  }, [room]);

  return (
    <ContainerTwo>
      <div
        id="Review"
        className="flex flex-col items-start room-section mb-36 "
      >
        {/* average review / review stat / total review */}
        {!isNaN(averageRatings) && averageRatings ? (
          <div className="lg:h-full lg:w-1/4 flex flex-col justify-start p-4 ">
            <h1
              className={`text-5xl md:text-4xl font-medium ${indicatorColor}`}
            >
              {averageRatings}/10
            </h1>
            <h2 className="text-3xl md:text-2xl font-medium">
              <RatingIndicator rating={averageRatings} />
            </h2>
            <p className="text-sm flex items-center gap-2 ">
              {totalRatings} verified reviews
              <CiCircleInfo className="text-xl font-bold hover:cursor-pointer" />
            </p>
          </div>
        ) : (
          <div className="lg:h-full lg:w-1/4 flex items-center justify-center text-5xl md:text-2xl font-medium text-blue-500  p-4 gap-2">
            <BiSad size={26} className="text-gray-700" />
            <h1>No Ratings Yet</h1>
          </div>
        )}
        {!isNaN(averageRatings) && averageRatings && (
          <div className="w-full lg:w-11/12  p-4   ">
            <h1 className="font-medium text-gray-700 ">RecentReviews</h1>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className=" relative "
            >
              {/* left button */}
              <button
                className={` ${
                  isVisible ? "opacity-100" : "opacity-0    "
                } absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full transition-opacity ease-in duration-150 hover:bg-sky-100`}
                onClick={() => swiperInstance.slidePrev()}
              >
                <CiCircleChevLeft className="text-sky-700 text-4xl" />
              </button>
              {/* right button */}
              <button
                className={` ${
                  isVisible ? "opacity-100" : "opacity-0    "
                } absolute right-0 -translate-y-1/2 top-1/2 z-10 bg-white rounded-full transition-opacity ease-in duration-150 hover:bg-sky-100`}
                onClick={() => swiperInstance.slideNext()}
              >
                <CiCircleChevRight className="text-sky-700 text-4xl" />
              </button>

              <Swiper
                spaceBetween={5}
                slidesPerView={1}
                breakpoints={swiperBreakpoints}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                className="h-full"
              >
                {reviews.map((review) => (
                  <SwiperSlide key={review?._id}>
                    <RoomReviewBox
                      review={review}
                      setIsModalOpen={setIsModalOpen}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="mt-3">
              <button
                onClick={handleModalButton}
                className="text-sky-500 hover:text-sky-600 hover:bg-sky-100 font-bold w-full border border-gray-700 p-2 rounded-xl flex justify-center items-center "
              >
                See All Reviews
                <FaArrowRight />
              </button>
            </div>
            {/* modal */}
            <RoomReviewModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              roomId={room?._id}
              averageRating={averageRatings}
              reviews={reviews}
              totalReviews={totalRatings}
            />
          </div>
        )}
      </div>
    </ContainerTwo>
  );
};

export default RoomReview;
