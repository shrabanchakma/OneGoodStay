import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const BottomNavOption = ({ icon: Icon, path }) => {
  return (
    <NavLink to={path}>
      {({ isActive }) =>
        isActive ? (
          <Icon className="text-4xl text-sky-500 " />
        ) : (
          <Icon className="text-4xl text-gray-700 " />
        )
      }
    </NavLink>
  );
};

BottomNavOption.propTypes = {};

export default BottomNavOption;
