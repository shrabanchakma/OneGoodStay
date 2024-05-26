import PropTypes from "prop-types";
import { FaAngleRight, FaPenToSquare } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
const AllUserDataRow = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogBoxVisibility = () => setIsOpen(true);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
        action jackson
      </td>
    </tr>
  );
};

AllUserDataRow.propTypes = {
  user: PropTypes.object,
};

export default AllUserDataRow;
