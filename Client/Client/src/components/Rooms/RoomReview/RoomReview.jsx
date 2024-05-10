import { Swiper, SwiperSlide } from "swiper/react";
import RoomReviewBox from "./RoomReviewBox";
import ContainerTwo from "../../Shared/ContainerTwo";
import { useState } from "react";
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";
const RoomReview = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsVisible(true);
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  console.log(swiperInstance);
  return (
    <ContainerTwo>
      <div className="flex items-center h-56 my-20 ">
        {/* average review / review stat / total review */}
        <div className="h-full w-1/4 flex flex-col justify-start p-4 bg-blue-500">
          <h1 className="text-4xl font-medium">7/10</h1>
          <h2 className="text-2xl font-medium">Good</h2>
          <p className="text-sm">431 verified reviews </p>
        </div>

        <div className="w-2/3 h-full relative bg-slate-400">
          <h1 className="font-medium text-gray-700">RecentReviews</h1>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={` ${
              isVisible ? "opacity-100" : "opacity-0    "
            } absolute left-0 top-1/2 z-10 bg-white rounded-full transition-opacity ease-in duration-150`}
            onClick={() => swiperInstance.slidePrev()}
          >
            <CiCircleChevLeft className="text-sky-700 text-4xl" />
          </button>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={` ${
              isVisible ? "opacity-100" : "opacity-0    "
            } absolute right-0 top-1/2 z-10 bg-white rounded-full transition-opacity ease-in duration-150`}
            onClick={() => swiperInstance.slideNext()}
          >
            <CiCircleChevRight className="text-sky-700 text-4xl" />
          </button>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="h-full w-full"
          >
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
            </Swiper>
          </div>
        </div>
      </div>
    </ContainerTwo>
  );
};

export default RoomReview;
