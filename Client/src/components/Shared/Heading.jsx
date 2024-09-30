import PropTypes from "prop-types";
const Heading = ({ label }) => {
  return <div className="text-2xl md:text-3xl font-medium mb-2">{label}</div>;
};

export default Heading;
Heading.propTypes = {
  label: PropTypes.string,
};
