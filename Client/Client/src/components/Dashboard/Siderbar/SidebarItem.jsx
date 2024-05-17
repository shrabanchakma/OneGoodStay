import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";
const SidebarItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        isActive
          ? "bg-gray-100 flex items-center justify-between h-16 px-4 py-2 border border-black rounded-xl  mx-2 my-1 transition-colors ease-in duration-150"
          : "flex items-center justify-between h-16 px-4 py-2 border border-black rounded-xl  mx-2 my-1"
      }
    >
      <div className="flex items-center gap-3">
        <Icon className="text-2xl" />
        <p className="text-lg font-medium">{label}</p>
      </div>
      <FaChevronRight />
    </NavLink>
  );
};

export default SidebarItem;
SidebarItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.node,
};
