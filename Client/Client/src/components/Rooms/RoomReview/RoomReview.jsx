import { Swiper, SwiperSlide } from "swiper/react";
import RoomReviewBox from "./RoomReviewBox";
const RoomReview = () => {
  return (
    <div className="flex items-center h-44 my-20 w-5/6">
      {/* average review / review stat / total review */}
      <div className="h-full  flex flex-col justify-start bg-blue-500">
        <h1 className="text-4xl font-medium">7/10</h1>
        <h2 className="text-2xl font-medium">Good</h2>
        <p className="text-sm">431 verified reviews </p>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={2}
        className="h-full w-2/3 bg-green-500"
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
  );
};

export default RoomReview;
