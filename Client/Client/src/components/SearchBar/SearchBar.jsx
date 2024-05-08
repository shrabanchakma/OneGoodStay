import FilterByDate from "./FilterByDate";
import FilterByGuestNumbers from "./FilterByGuestNumbers";
import FilterByPlace from "./FilterByPlace";

const SearchBar = () => {
  return (
    <div>
      <p className="text-3xl font-medium mb-2">Where to?</p>
      <div className="flex items-center gap-3">
        {/* filter search */}
        <div className="w-11/12 flex items-center justify-evenly gap-4  ">
          <FilterByPlace />
          <FilterByDate />
          <FilterByGuestNumbers />
        </div>
        {/* search button*/}
        <button className="bg-sky-600 text-white font-bold w-1/12 h-12 rounded-3xl ">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
