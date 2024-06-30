import PropTypes from "prop-types";
import SidebarItem from "../Siderbar/SidebarItem";
import { BsFillHouseAddFill } from "react-icons/bs";

const GuestOptions = () => {
  return (
    <>
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
