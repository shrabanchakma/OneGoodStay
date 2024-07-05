import PropTypes from "prop-types";
import { FaAngleRight, FaPenToSquare } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import RoomEditDialogBox from "./RoomEditDialogBox";
import { useState } from "react";
import { formatDate } from "../../../../Api/utils";
const HostedRoomsDataRow = ({ room, handleDeleteRoom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogBoxVisibility = () => setIsOpen(true);
  return (
    <tr className={`${room?.status === "checkedOut" && "bg-orange-50"} `}>
      <td className="p-1 md:px-5 md:py-5 border-b border-gray-200  text-sm ">
        <div className="flex flex-col  md:flex-row items-center ">
          <div className="hidden md:flex items-center relative md:mr-2">
            <img
              alt="profile"
              src={room?.image}
              className="object-cover rounded w-20 "
            />
            <p className="text-gray-900 whitespace-normal w-[15rem] text-start">
              <span className="font-semibold text-gray-800  ">Title:</span>{" "}
              {room?.title}
            </p>
          </div>
          <div className="w-full">
            <p className="text-gray-900 whitespace-nowrap  md:hidden text-start">
              <span className="font-semibold text-gray-800  ">Title:</span>{" "}
              {room?.title}
            </p>
            <div className="table-cell md:hidden">
              <p className="text-gray-900 whitespace-nowrap text-start">
                <span className="font-semibold text-gray-800">Location:</span>{" "}
                {room?.location}
              </p>
              <div>
                <span className="font-semibold text-gray-800">From:</span>{" "}
                <p className="text-gray-900 whitespace-no-wrap inline-block">
                  {formatDate(room?.startDate)}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-800">To:</span>{" "}
                <p className="text-gray-900 whitespace-no-wrap inline-block">
                  {formatDate(room?.endDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </td>
      <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200  text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
      </td>
      <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200  text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {formatDate(room?.startDate)}
        </p>
      </td>
      <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200  text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {formatDate(room?.endDate)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        {room?.status === "available" && (
          <span className="font-semibold text-green-900 leading-tight whitespace-nowrap">
            Available
          </span>
        )}
        {room?.status === "booked" && (
          <span className="font-semibold text-purple-500 leading-tight whitespace-nowrap">
            Booked
          </span>
        )}
        {room?.status === "checkedIn" && (
          <span className="font-semibold text-blue-500 leading-tight whitespace-nowrap">
            Checked in
          </span>
        )}

        {room?.status === "checkedOut" && (
          <span
            data-tooltip-id="inform"
            data-tooltip-delay-show={300}
            data-tooltip-content={"Room is free now. Update room availability"}
            data-tooltip-place="bottom"
            data-tooltip-variant="warning"
            data-tooltip-float="true"
            className="font-semibold text-gray-500 leading-tight ring-2 ring-orange-500  rounded-sm whitespace-nowrap"
          >
            Checked out
          </span>
        )}
        {room?.status === "needs_update" && (
          <span
            data-tooltip-id="inform"
            data-tooltip-delay-show={300}
            data-tooltip-content={"Room needs update(Change availability date)"}
            data-tooltip-place="bottom"
            data-tooltip-variant="error"
            data-tooltip-float="true"
            className="font-semibold text-gray-500 leading-tight ring-2 ring-red-500  rounded-sm whitespace-nowrap"
          >
            Needs update
          </span>
        )}
      </td>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <span
          onClick={handleDialogBoxVisibility}
          data-tooltip-id="inform"
          data-tooltip-delay-show={300}
          data-tooltip-content="edit"
          data-tooltip-float="true"
          data-tooltip-variant={
            room?.status === "checkedOut" ? "warning" : "error"
          }
          className={`px-2 cursor-pointer font-semibold text-lg leading-tight flex items-center justify-between active:bg-neutral-200 ${
            room?.status === "checkedOut" && "text-orange-500"
          } ${room?.status === "needs_update" && "text-red-500"}`}
        >
          <FaPenToSquare />
          <FaAngleRight />
        </span>
        <Tooltip id="inform" />
        {/* edit room */}
        <RoomEditDialogBox
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleDeleteRoom={handleDeleteRoom}
          roomId={room?._id}
          status={room?.status}
        />
      </td>
    </tr>
  );
};

HostedRoomsDataRow.propTypes = {
  room: PropTypes.object,
  handleDeleteRoom: PropTypes.func,
};

export default HostedRoomsDataRow;
