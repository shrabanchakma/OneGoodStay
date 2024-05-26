import React from "react";
import PropTypes from "prop-types";
import SidebarItem from "../Siderbar/SidebarItem";
import { BsFillHouseAddFill, BsHousesFill } from "react-icons/bs";

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
