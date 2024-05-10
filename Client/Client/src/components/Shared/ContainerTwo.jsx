import PropTypes from "prop-types";
const ContainerTwo = ({ children }) => {
  return <div className="max-w-[975px]">{children}</div>;
};

export default ContainerTwo;
ContainerTwo.propTypes = {
  children: PropTypes.node,
};
