import { useLoaderData } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchedRoomsSidebar from "./SearchedRoomsSidebar";
import SearchedRoom from "./SearchedRoom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
const options = ["Recommended", "Price high to low", "price low to high"];
const SearchedRooms = () => {
  const rooms = useLoaderData();
  const [selectedOption, setSelectedOption] = useState("Recommended");
  console.log("loader rooms -->", rooms);
  const selectOption = (option) => {
    setSelectedOption(option);
  };
  return (
    <div>
      <SearchBar />
      <section className="w-full flex items-center mt-5">
        <SearchedRoomsSidebar />
        <div className=" w-4/6 grid cols-span-1 h-auto gap-2">
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
          {rooms.map((room, idx) => (
            <SearchedRoom key={idx} room={room} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchedRooms;
