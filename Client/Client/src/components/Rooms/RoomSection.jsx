import PropTypes from "prop-types";
const RoomSection = ({ label }) => {
  return (
    <h1 className="font-medium pb-3 active:text-sky-500 hover:text-sky-600 hover:cursor-pointer border-b-[3px] border-transparent transition-color ease-out duration-150 hover:border-sky-500 ">
      {label}
    </h1>
  );
};
export default RoomSection;

RoomSection.propTypes = {
  label: PropTypes.string,
};
