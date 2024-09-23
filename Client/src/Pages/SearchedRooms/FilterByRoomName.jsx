import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  CloseButton,
  Field,
  Input,
  Label,
  Popover,
  PopoverButton,
  PopoverPanel,
  useClose,
} from "@headlessui/react";
import { IoLocationSharp, IoSearch } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import FilterRoom from "./FilterRoom";

const FilterByRoomName = ({ rooms, saveFilterData }) => {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [isPopoverBtnClicked, setIsPopoverBtnClicked] = useState(0);
  const inputRef = useRef();
  const panelRef = useRef();
  const removeTextBtn = useRef();
  const errMsg = "";
  console.log("selected room---->", selectedRoom);

  const handleSearchText = (e) => {
    if (e.target.value.length === 0) {
      setFilteredRooms([]);
    }
    setSearchText(e.target.value);
  };
  const clearSearchText = (e) => {
    if (
      (panelRef.current && !panelRef.current.contains(e.target)) ||
      removeTextBtn.current
    ) {
      inputRef.current.value = "";
      setSearchText("");
      setFilteredRooms([]);
    }
  };

  const handleRemoveSelectedRoom = (e) => {
    if (selectedRoom) {
      setSelectedRoom("");
      saveFilterData("title", "");
    }
    e.stopPropagation();
  };

  const handleFilterRoomsCleanUp = () => {
    setIsPopoverBtnClicked((prev) => !prev);
  };

  const handleSelectedRoomCleanup = () => {
    setSelectedRoom("");
    saveFilterData("title", "");
  };

  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = rooms.filter((room) =>
        new RegExp(searchText, "i").test(room?.title)
      );
      setFilteredRooms(filtered);
    } else if (selectedRoom) {
      const filtered = rooms.filter((room) =>
        new RegExp(selectedRoom, "i").test(room?.title)
      );
      setFilteredRooms(filtered);
    }
  }, [searchText, rooms, isPopoverBtnClicked, selectedRoom]);

  useEffect(() => {
    document.addEventListener("mousedown", clearSearchText);
    return () => {
      document.removeEventListener("mousedown", clearSearchText);
    };
  }, []);
  return (
    <div>
      <h1 className="font-bold text-gray-700 text-xl mb-1">
        Search by room name
      </h1>
      <Popover className={"relative hidden lg:block"}>
        <PopoverButton
          onClick={handleFilterRoomsCleanUp}
          className={`text-xl w-full h-12 border-gray-600 rounded-lg text-start flex items-center justify-between gap-1 px-2 data-[active]:border-none data-[active]:outline data-[active]:outline-[#1668E3]  ${
            errMsg ? "outline outline-[#e41b43] mb-1" : "border"
          } `}
        >
          <div className="flex items-center">
            <div className="h-9 w-9 grid gird-cols-1 place-items-center ">
              <IoSearch />
            </div>
            <div>
              <span>{selectedRoom ? "" : "Room name?"}</span>
              {selectedRoom && (
                <div>
                  <p className="text-sm ">{selectedRoom}</p>
                </div>
              )}
            </div>
          </div>
          <button onClick={(e) => handleRemoveSelectedRoom(e)}>
            <MdCancel size={17} className="cursor-pointer" />
          </button>
        </PopoverButton>
        {/* error message */}
        {errMsg && (
          <span className="text-rose-600 text-[14px] ml-[.4rem]">{errMsg}</span>
        )}
        <PopoverPanel
          transition
          ref={panelRef}
          anchor="bottom"
          className={
            "flex origin-top-left flex-col transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 [--anchor-gap:-3.2rem] w-[27rem]  shadow bg-white"
          }
        >
          <div className=" rounded-lg">
            <Field className="border-b flex items-center justify-between mt-3 px-3">
              <Input
                ref={inputRef}
                placeholder=""
                defaultValue={selectedRoom ? selectedRoom : ""}
                onChange={handleSearchText}
                className={
                  " py-3 px-4  block w-full rounded-lg border-none bg-white/5 text-3xl font-bold text-gray-800  outline-none"
                }
              />
              {(searchText.length > 0 || selectedRoom) && (
                <button ref={removeTextBtn} onClick={handleSelectedRoomCleanup}>
                  <MdCancel size={17} className="cursor-pointer" />
                </button>
              )}
            </Field>
          </div>

          <div className=" h-[20rem] overflow-y-auto overflow-x-hidden">
            {filteredRooms && filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <FilterRoom
                  key={room?._id}
                  room={room}
                  saveFilterData={saveFilterData}
                  setSelectedRoom={setSelectedRoom}
                />
              ))
            ) : searchText.length > 0 && filteredRooms == 0 ? (
              <div className="flex flex-col items-center justify-center mt-10">
                <IoSearch size={35} />
                <p className="text-gray-700">Not found</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-10">
                <IoSearch size={35} />
                <p className="text-gray-700">Search by room names</p>
              </div>
            )}
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
};

FilterByRoomName.propTypes = {};

export default FilterByRoomName;
