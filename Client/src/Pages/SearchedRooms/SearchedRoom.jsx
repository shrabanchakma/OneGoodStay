import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookmarkBtn from "../../components/Shared/BookmarkBtn";

const SearchedRoom = ({ room }) => {
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
          <div className="flex items-center gap-1 w-full">
            <div className="h-7 w-7 grid grid-cols-1 text-center  bg-blue-500 rounded-md text-white font-semibold">
              5.5
            </div>
            <div className="relative space-y-0.5">
              <p className="text-gray-700 font-semibold text-[14px]">
                Exeptional
              </p>
              <span className="text-[14px]">5 reviews</span>
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
