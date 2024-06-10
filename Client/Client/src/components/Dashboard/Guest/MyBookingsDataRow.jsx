import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../../Api/utils";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
const MyBookingsDataRow = ({ room }) => {
  console.log("inside-->", room);
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const handleRoomDetailsBtn = () => {
    setIsSpinning(true);
    setTimeout(() => {
      navigate(`/room-details/${room?._id}`);
    }, 200);
  };
  return (
    <tr className="group">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm group-hover:bg-slate-50">
        <img src={room?.image} alt="" className="w-16 " />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm group-hover:bg-slate-50">
        <p className="text-gray-900 whitespace-no-wrap">{room?.title}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm group-hover:bg-slate-50">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm group-hover:bg-slate-50">
        <p className="text-gray-900 whitespace-no-wrap">{room?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm group-hover:bg-slate-50">
        <p className="text-gray-900 whitespace-no-wrap">
          {formatDate(room?.startDate)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm group-hover:bg-slate-50">
        <p className="text-gray-900 whitespace-no-wrap">
          {formatDate(room?.startDate)}
        </p>
      </td>
      <td className=" border-b border-gray-200 bg-white text-sm group-hover:bg-slate-50">
        <button
          onClick={handleRoomDetailsBtn}
          className="h-[35px] w-[7vw] px-4 py-2 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white rounded-md  flex items-center justify-center gap-1"
        >
          {isSpinning ? (
            <ImSpinner8 className="animate-spin h-[20px] w-auto" />
          ) : (
            <>
              Room Details <FaAngleRight />
            </>
          )}
        </button>
      </td>
    </tr>
  );
};

MyBookingsDataRow.propTypes = {};

export default MyBookingsDataRow;
