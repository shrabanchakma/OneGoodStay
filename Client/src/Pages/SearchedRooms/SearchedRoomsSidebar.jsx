import React from "react";
import PropTypes from "prop-types";
import FilterByCategory from "./FilterByCategory";
import FilterByRoomName from "./FilterByRoomName";

const SearchedRoomsSidebar = ({ saveFilterData, rooms }) => {
  return (
    <>
      <div className="w-2/6  min-h-full hidden lg:block ">
        <FilterByRoomName rooms={rooms} saveFilterData={saveFilterData} />
        <FilterByCategory />
      </div>
      <div className="block lg:hidden">hi</div>
    </>
  );
};

SearchedRoomsSidebar.propTypes = {};

export default SearchedRoomsSidebar;
