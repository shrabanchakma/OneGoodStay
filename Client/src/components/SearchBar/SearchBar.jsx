import { useState } from "react";
import Heading from "../Shared/Heading";
import FilterByDate from "./FilterByDate";
import FilterByGuestNumbers from "./FilterByGuestNumbers";
import FilterByPlace from "./FilterByPlace";

const SearchBar = () => {
  
  const handleFilter = () => {
    console.log("this is handle filter");
  };
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="w-10/12 text-start">
        <Heading label="Where to?" />
      </div>
      {/* filter search */}
      <div className="w-10/12 md:w-full grid  grid-cols-1 md:grid-cols-4 gap-4">
        <FilterByPlace />
        <FilterByDate />
        <FilterByGuestNumbers />
        <button className="w-full md:w-1/2 bg-sky-600 text-white font-bold  h-12 rounded-3xl ">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
