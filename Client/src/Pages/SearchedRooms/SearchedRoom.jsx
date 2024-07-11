import React from "react";
import PropTypes from "prop-types";

const SearchedRoom = ({ room }) => {
  return (
    <div className="h-20">
      <h1>{room?.title}</h1>
    </div>
  );
};

SearchedRoom.propTypes = {};

export default SearchedRoom;
