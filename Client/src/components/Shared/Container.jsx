import PropTypes from "prop-types";
const Container = ({ children }) => {
  return <div className="max-w-[1280px]  mx-auto">{children}</div>;
};

export default Container;
Container.propTypes = {
  children: PropTypes.node,
};
