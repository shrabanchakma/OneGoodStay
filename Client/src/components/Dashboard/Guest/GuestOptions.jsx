import PropTypes from "prop-types";
import SidebarItem from "../Siderbar/SidebarItem";
import { BsFillHouseAddFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
const GuestOptions = () => {
  return (
    <>
      <SidebarItem
        label="Analytics"
        icon={IoStatsChart}
        address={"./analytics/guest"}
      />
      <SidebarItem
        label="myBookings"
        icon={BsFillHouseAddFill}
        address={"./my-bookings"}
      />
    </>
  );
};

GuestOptions.propTypes = {
  children: PropTypes.node,
};

export default GuestOptions;
