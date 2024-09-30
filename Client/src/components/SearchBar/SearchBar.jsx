import { useState } from "react";
import Heading from "../Shared/Heading";
import FilterByDate from "./FilterByDate";
import FilterByGuestNumbers from "./FilterByGuestNumbers";
import FilterByPlace from "./FilterByPlace";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchData, setSearchData] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const saveSearchData = (name, value) => {
    setSearchData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const searchRooms = async () => {
    if (!searchData?.city) {
      setErrMsg("Please select a city");
      return;
    }
    setErrMsg("");
    console.log("searchData--->", searchData);
    const { city, startDate, endDate, roomCount, guestCount } = searchData;
    navigate(
      `room-search?city=${city}&startDate=${startDate}&endDate=${endDate}&rooms=${roomCount}&guests=${guestCount}`
    );
  };
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="w-10/12 text-start">
        <Heading label="Where to?" />
      </div>
      {/* filter search */}
      <div className="w-10/12 md:w-full flex flex-col md:flex-row  items-center justify-center   gap-3">
        <FilterByPlace
          saveSearchData={saveSearchData}
          searchData={searchData}
          errMsg={errMsg}
          setErrMsg={setErrMsg}
        />
        <FilterByDate saveSearchData={saveSearchData} />
        <FilterByGuestNumbers saveSearchData={saveSearchData} />
        <button
          onClick={searchRooms}
          className="w-full md:w-1/2 bg-sky-600 text-white font-bold  h-12 rounded-3xl "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
