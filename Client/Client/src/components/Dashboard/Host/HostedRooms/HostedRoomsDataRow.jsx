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
    <tr className={`${room?.status === "checkedOut" && "bg-orange-50"}`}>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={room?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{room?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {formatDate(room?.startDate)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200  text-sm">
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
            data-tooltip-content={"Room is free now. Update room availability"}
            data-tooltip-place="bottom"
            data-tooltip-variant="warning"
            data-tooltip-float="true"
            className="font-semibold text-gray-500 leading-tight ring-2 ring-orange-500  rounded-sm whitespace-nowrap"
          >
            Checked out
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
            room?.status === "checkedOut" ? "warning" : "light"
          }
          className={`px-2 cursor-pointer font-semibold text-lg leading-tight flex items-center justify-between active:bg-neutral-200 ${
            room?.status === "checkedOut" && "text-orange-500"
          }`}
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
