import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HostOptionsMobile = (props) => {
  return (
    <div className="px-4">
      <ul className="font-medium">
        <li className="py-2 active:bg-neutral-100">
          <Link to="./my-bookings">My Bookings</Link>
        </li>
        <li className="py-2 active:bg-neutral-100">
          <Link to="./add-rooms">Add Rooms</Link>
        </li>
        <li className="py-2 active:bg-neutral-100">
          <Link to="./hosted-rooms">Hosted Rooms</Link>
        </li>
        <li className="py-2 active:bg-neutral-100">
          <Link to="/">Go Home</Link>
        </li>
      </ul>
    </div>
  );
};

HostOptionsMobile.propTypes = {};

export default HostOptionsMobile;
