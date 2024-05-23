import PropTypes from "prop-types";

const DefaultButton = ({ label }) => {
  return (
    <button className="bg-sky-600 text-white font-bold w-full h-12 rounded-3xl ">
      {label}
    </button>
  );
};

DefaultButton.propTypes = { label: PropTypes.string };

export default DefaultButton;
