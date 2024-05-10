import { Swiper, SwiperSlide } from "swiper/react";
import RoomReviewBox from "./RoomReviewBox";
import ContainerTwo from "../../Shared/ContainerTwo";
import { useState } from "react";
import {
  CiCircleChevRight,
  CiCircleChevLeft,
  CiCircleInfo,
} from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
const RoomReview = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsVisible(true);
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  return (
    <ContainerTwo>
      <div id="Review" className="flex items-center h-56 mt-24 mb-28">
        {/* average review / review stat / total review */}
        <div className="h-full w-1/4 flex flex-col justify-start p-4 ">
          <h1 className="text-4xl font-medium">7/10</h1>
          <h2 className="text-2xl font-medium">Good</h2>
          <p className="text-sm flex items-center gap-2 ">
            431 verified reviews
            <CiCircleInfo className="text-xl font-bold hover:cursor-pointer" />
          </p>
        </div>

        <div className="w-2/3 h-full  ">
          <h1 className="font-medium text-gray-700 ">RecentReviews</h1>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="h-full w-full relative "
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
              spaceBetween={0}
              slidesPerView={2}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              className="h-full"
            >
              <SwiperSlide>
                <RoomReviewBox />
              </SwiperSlide>
              <SwiperSlide>
                <RoomReviewBox />
              </SwiperSlide>
              <SwiperSlide>
                <RoomReviewBox />
              </SwiperSlide>
              <SwiperSlide>
                <RoomReviewBox />
              </SwiperSlide>
              <SwiperSlide>
                <RoomReviewBox />
              </SwiperSlide>
              <SwiperSlide>
                <RoomReviewBox />
              </SwiperSlide>
              <SwiperSlide>
                <RoomReviewBox />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="mt-3">
            <button className="text-sky-500 hover:text-sky-600 hover:bg-sky-100 font-bold w-26 border border-gray-700 p-2 rounded-xl flex items-center">
              See All Reviews
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </ContainerTwo>
  );
};

export default RoomReview;
