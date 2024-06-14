import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const RoomSection = ({ label, roomId }) => {
  const { hash } = useLocation();
  console.log(hash, label);
  const hashLabel = `#${label}`;
  return (
    <HashLink
      smooth
      to={`/room-details/${roomId}${hashLabel}`}
      className={`font-medium pb-3 hover:text-sky-600 hover:cursor-pointer border-b-[3px] border-transparent transition-color ease-out duration-150 hover:border-sky-500 ${
        hash === hashLabel && "text-sky-600 border-sky-500"
      }`}
    >
      {label}
    </HashLink>
  );
};
export default RoomSection;

RoomSection.propTypes = {
  label: PropTypes.string,
};
