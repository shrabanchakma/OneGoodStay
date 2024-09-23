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
      <section className="w-full  flex items-start mt-14 gap-5">
        <SearchedRoomsSidebar
          saveFilterData={saveFilterData}
          rooms={filteredRooms}
        />
        <div className=" w-4/6 grid cols-span-1 h-auto gap-2 ">
          {/* filter */}
          <div className="flex items-center w-10/12">
            <p className="w-1/2 font-semibold text-gray-700 text-[14px]">
              Total {rooms.length} rooms
            </p>
            <div className="w-1/2  border border-black rounded-xl">
              <Menu>
                <MenuButton
                  className={
                    "text-gray-700 w-full text-start py-1 px-4 flex items-center justify-between"
                  }
                >
                  <div>
                    <p className="text-[14px] font-semibold text-gray-900">
                      Sort by
                    </p>
                    <span>{selectedOption}</span>
                  </div>
                  <FaChevronDown />
                </MenuButton>
                <MenuItems
                  anchor="bottom"
                  className={
                    "bg-white w-[var(--button-width)] [--anchor-gap:4px] border border-gray-500 "
                  }
                >
                  {options.map((option, idx) => (
                    <MenuItem key={idx}>
                      <p
                        onClick={() => selectOption(option)}
                        className="block data-[focus]:bg-blue-500 data-[focus]:text-white w-full px-2 cursor-pointer"
                      >
                        {option}
                      </p>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
          {isLoading
            ? numberOfSkeletons.map((skeleton) => (
                <RoomSkeleton key={skeleton} />
              ))
            : filteredRooms.map((room, idx) => (
                <SearchedRoom key={idx} serial={idx + 1} room={room} />
              ))}
        </div>
      </section>
    </div>
  );
};

export default SearchedRooms;
