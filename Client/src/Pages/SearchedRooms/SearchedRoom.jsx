import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookmarkBtn from "../../components/Shared/BookmarkBtn";
import { getAverageRatings } from "../../Api/rooms";
import { getIndicatorColor } from "../../Api/utils";
import { topAmenitiesData as amenities } from "../../components/Rooms/TopAmenities/TopAmenitiesData";

const SearchedRoom = ({ room, serial, filterOptions }) => {
  const [averageRatings, setAverageRatings] = useState(0);
  const [indicatorColor, setIndicatorColor] = useState("text-black");
  const [displayAmenities, setDisplayAmenities] = useState([]);
  const isRoomNameSearched = serial == 1 && filterOptions?.title;
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

  const getRatingClassification = (rating) => {
    if (rating >= 7 && rating < 8) return "Good";
    else if (rating >= 8 && rating < 8.6) return "Very good";
    else if (rating >= 8.6 && rating < 9) return "Excellent";
    else if (rating >= 9 && rating < 10) return "Wonderful";
    else if (rating == 10) return "Exceptional";
  };

  useEffect(() => {
    getRoomData();
  }, [room]);

  useEffect(() => {
    const roomAmenities = room?.amenities;
    const filtered = amenities.filter((amenity) =>
      roomAmenities.includes(amenity?.label)
    );
    setDisplayAmenities(filtered.slice(0, 3));
  }, [room]);
  return (
    <Link
      to={`/room-details/${room?._id}`}
      className="mx-auto w-11/12 h-[20rem] md:h-full lg:w-10/12 "
    >
      {isRoomNameSearched && (
        <div className="bg-[#2563EB] w-full rounded-t-xl px-3 py-1 ">
          <span className="text-white font-bold opacity-95">
            You were interested in this room
          </span>
        </div>
      )}
      <div
        className={`flex items-center  border h-full  ${
          isRoomNameSearched ? "rounded-b-xl" : "rounded-xl"
        } `}
      >
        <div className="w-2/5 md:w-1/2 lg:w-2/6 h-full relative bg-green-200 ">
          <img
            src={room?.image}
            className={`${
              isRoomNameSearched ? "" : "rounded-l-xl"
            } w-full h-full object-cover `}
          />
          <div className="absolute top-2 right-2">
            <BookmarkBtn />
          </div>
        </div>
        <div className="w-3/5 md:w-1/2 lg:w-3/4 grid grid-cols-1 md:grid-cols-2 h-full p-2 text-gray-700 bg-green-200">
          <div className="flex flex-col justify-evenly md:justify-between w-full ">
            <div className="md:mb-3 w-full ">
              <h1 className="font-semibold  ">{room?.title}</h1>
              <p className="text-[14px]">{room?.location.split(",")[0]}</p>
              <span>
                <div className="flex items-center flex-wrap gap-3">
                  {displayAmenities.map((amenity, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-start gap-1">
                        {<amenity.icon className="text-base" />}
                        <p className="text-[12px] whitespace-nowrap">
                          {amenity.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </span>
            </div>
            <div className="flex items-center gap-1 w-full ">
              <div
                className={`h-7 w-7 grid grid-cols-1 text-center  
              ${indicatorColor} rounded-md text-white font-semibold`}
              >
                {averageRatings}
              </div>
              <div className="space-y-0.5 ">
                <span className="text-[14px] grid grid-cols-1 ">
                  {room && room?.averageRatings && (
                    <p className="text-gray-700 font-semibold text-[14px]">
                      {getRatingClassification(room?.averageRatings)}
                    </p>
                  )}
                  {room?.totalReviews} reviews
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-end justify-end text-gray-700 font-semibold text-xl">
            <p>
              USD <span>{room?.price}</span>
            </p>
            <span className="text-[10px] text-gray-500 text-right">
              USD {room?.price} total <br />
              {"Doesn't includes texes & fees"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

SearchedRoom.propTypes = {
  room: PropTypes.object,
  serial: PropTypes.number,
  filterOptions: PropTypes.object,
};

export default SearchedRoom;
