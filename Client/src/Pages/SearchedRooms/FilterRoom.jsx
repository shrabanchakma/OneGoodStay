import PropTypes from "prop-types";
import { CloseButton, useClose } from "@headlessui/react";
import { FaBuilding } from "react-icons/fa";
const FilterRoom = ({ room, saveFilterData, setSelectedRoom }) => {
  const close = useClose();
  const saveSelectedRoom = (roomName) => {
    saveFilterData("title", roomName);
    setSelectedRoom(roomName);
    // closeModal();
    close();
  };
  return (
    <CloseButton
      key={room?._id}
      as="button"
      onMouseDown={() => saveSelectedRoom(room?.title)}
      className="flex items-center justify-start gap-4 h-12 pl-5 mb-2 w-full hover:bg-blue-500/10 active:bg-blue-500/30"
    >
      <FaBuilding />
      <div className="flex flex-col items-start">
        <h1 className="font-bold block">{room?.title}</h1>
        <span className="block">{room?.location}</span>
      </div>
    </CloseButton>
  );
};

FilterRoom.propTypes = {
  room: PropTypes.object,
  saveFilterData: PropTypes.func,
  setSelectedRoom: PropTypes.func,
};

export default FilterRoom;
