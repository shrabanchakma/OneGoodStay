import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";
const RoomSection = ({ label, roomId, isActive }) => {
  return (
    <HashLink
      smooth
      to={`/room-details/${roomId}#${label}`}
      className={`font-medium pb-3 hover:text-sky-600 hover:cursor-pointer border-b-[3px]  transition-color ease-out duration-150 hover:border-sky-500 ${
        isActive
          ? "text-sky-600 border-b-solid border-sky-500 "
          : "border-transparent"
      }`}
    >
      {label}
    </HashLink>
  );
};
export default RoomSection;

RoomSection.propTypes = {
  label: PropTypes.string,
  roomId: PropTypes.string,
  isActive: PropTypes.bool,
};
