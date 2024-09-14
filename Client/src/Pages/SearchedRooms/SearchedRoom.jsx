import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookmarkBtn from "../../components/Shared/BookmarkBtn";
import { getAverageRatings } from "../../Api/rooms";
import { getIndicatorColor } from "../../Api/utils";

const SearchedRoom = ({ room }) => {
  const [averageRatings, setAverageRatings] = useState(0);
  const [indicatorColor, setIndicatorColor] = useState("text-black");

  const getRoomData = async () => {
    try {
      if (room._id) {
        const data = await getAverageRatings(room?._id);
        setAverageRatings(data?.averageRatings || 0);
        getIndicatorColor(data?.averageRatings || 0, setIndicatorColor, true);
      }
    } catch (err) {
      console.log("error is--->", err);
    }
  };
  useEffect(() => {
    getRoomData();
  }, [room]);
  return (
    <Link
      to={`/room-details/${room?._id}`}
      className="flex items-center border   w-10/12 rounded-xl"
    >
      <div className="w-2/6 relative">
        <img src={room?.image} className="rounded-l-xl" />
        <div className="absolute top-2 right-2">
          <BookmarkBtn />
        </div>
      </div>
      <div className="w-3/4 grid grid-cols-2 h-full p-2 text-gray-700">
        <div className="flex flex-col justify-between ">
          <div>
            <h1 className="font-semibold">{room?.title}</h1>
            <p className="text-[14px]">{room?.location.split(",")[0]}</p>
          </div>
          <div className="flex items-center gap-1 w-full ">
            <div
              className={`h-7 w-7 grid grid-cols-1 text-center  
              ${indicatorColor} rounded-md text-white font-semibold`}
            >
              {averageRatings}
            </div>
            <div className="space-y-0.5 ">
              <p className="text-gray-700 font-semibold text-[14px]">
                Exeptional
              </p>
              <span className="text-[14px] ">5 reviews</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-end justify-end text-gray-700 font-semibold text-xl">
          <p>
            USD <span>{room?.price}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

SearchedRoom.propTypes = {
  room: PropTypes.object,
};

export default SearchedRoom;
