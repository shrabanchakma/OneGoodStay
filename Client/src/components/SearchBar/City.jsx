import PropTypes from "prop-types";

const City = ({ city, icon: Icon }) => {
  return (
    <button className="flex items-center  gap-2 h-12 pl-5 w-full hover:bg-blue-500/10 active:bg-blue-500/30">
      <Icon className={"text-xl"} />
      <span className="font-bold">{city}</span>
    </button>
  );
};

City.propTypes = {
  city: PropTypes.string,
  Icon: PropTypes.node,
};

export default City;
