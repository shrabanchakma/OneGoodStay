import { useLoaderData } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchedRoomsSidebar from "./SearchedRoomsSidebar";
import SearchedRoom from "./SearchedRoom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import RoomSkeleton from "./RoomSkeleton.jsx";
import { getFilteredRooms } from "../../Api/rooms.js";
import toast from "react-hot-toast";
import SortingOptions from "./SortingOptions.jsx";
import FilteringAndSorting from "./FilteringAndSorting.jsx";
const options = ["Recommended", "Price high to low", "Price low to high"];
const SearchedRooms = () => {
  const roomsData = useLoaderData();
  const rooms = roomsData.rooms;
  const numberOfSkeletons = [1, 2, 3, 4, 5, 6, 7];
  const [isLoading, setIsLoading] = useState(true);
  // console.log("roomsData----->", roomsData);

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    sortOption: "Recommended",
  });
  const [selectedOption, setSelectedOption] = useState("Recommended");

  const selectOption = (option) => {
    setSelectedOption(option);
    saveFilterData("sortOption", option);
  };

  const saveFilterData = (field, value) => {
    setFilterOptions((prev) => ({ ...prev, [field]: value }));
  };
  // console.log("new filter data is--->", filterOptions);

  const filterRooms = async (queryData, filterOptions) => {
    try {
      const data = await getFilteredRooms(queryData, filterOptions);
      setFilteredRooms(data);
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setFilteredRooms(roomsData?.rooms);
  }, [roomsData]);
  useEffect(() => {
    setIsLoading(true);
    filterRooms(roomsData?.queryData, filterOptions);
  }, [roomsData, selectedOption, filterOptions]);

  return (
    <div>
      <SearchBar />
      <section className="w-full  block lg:flex items-start mt-14 gap-5">
        <SearchedRoomsSidebar
          saveFilterData={saveFilterData}
          rooms={filteredRooms}
        />
        <div className=" w-full lg:w-4/6 grid cols-span-1 mx-auto h-auto gap-2 ">
          <div className="hidden lg:flex items-center w-10/12">
            <p className="w-1/2 font-semibold text-gray-700 text-[14px]">
              Total {rooms.length} rooms
            </p>
            <SortingOptions
              selectOption={selectOption}
              options={options}
              selectedOption={selectedOption}
            />
          </div>
          <div className="lg:hidden flex flex-col items-center mb-10 ">
            <FilteringAndSorting />
            <p className="text-center text-[14px]">{rooms.length} rooms</p>
          </div>
          {isLoading
            ? numberOfSkeletons.map((skeleton) => (
                <RoomSkeleton key={skeleton} />
              ))
            : filteredRooms.map((room, idx) => (
                <SearchedRoom
                  key={idx}
                  serial={idx + 1}
                  room={room}
                  filterOptions={filterOptions}
                />
              ))}
        </div>
      </section>
    </div>
  );
};

export default SearchedRooms;
