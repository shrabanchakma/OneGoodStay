import PropTypes from "prop-types";
import { FaAngleRight, FaPenToSquare } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import RoomEditDialogBox from "./RoomEditDialogBox";
import { useState } from "react";
const HostedRoomsDataRow = ({ room, formatDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogBoxVisibility = () => setIsOpen(true);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {formatDate(room?.startDate)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {formatDate(room?.endDate)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="font-semibold text-green-900 leading-tight">
          Available
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
        <span
          onClick={handleDialogBoxVisibility}
          data-tooltip-id="tooltip"
          data-tooltip-delay-show={300}
          className="px-2 cursor-pointer font-semibold text-lg leading-tight flex items-center justify-between active:bg-neutral-200"
        >
          <FaPenToSquare />
          <FaAngleRight />
        </span>
        <Tooltip id="tooltip" place="bottom" content="Edit" variant="light" />
        {/* edit room */}
        <RoomEditDialogBox isOpen={isOpen} setIsOpen={setIsOpen} />
      </td>
    </tr>
  );
};

HostedRoomsDataRow.propTypes = {
  room: PropTypes.object,
  formatDate: PropTypes.func,
};

export default HostedRoomsDataRow;
