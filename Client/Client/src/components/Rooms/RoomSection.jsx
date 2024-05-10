import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";
const RoomSection = ({ label }) => {
  return (
    <HashLink
      smooth
      to={`/room-details/#${label}`}
      activeClassName="text-sky-600 border:text-sky-600"
      className="font-medium pb-3 hover:text-sky-600 hover:cursor-pointer border-b-[3px] border-transparent transition-color ease-out duration-150 hover:border-sky-500 "
    >
      {label}
    </HashLink>
  );
};
export default RoomSection;

RoomSection.propTypes = {
  label: PropTypes.string,
};
