import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";
const SidebarItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      className={
        "flex items-center justify-between px-3 py-3  xl:h-16 xl:px-4 xl:py-2 border border-black rounded-xl  mx-2 my-1"
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
  icon: PropTypes.func,
};
