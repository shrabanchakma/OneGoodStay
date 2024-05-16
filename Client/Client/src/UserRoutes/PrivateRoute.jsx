import useAuth from "../Hooks/useAuth";
import Loader from "../components/Shared/Loader";
import PropTypes from "prop-types";
const PrivateRoute = ({ children }) => {
  const { loading } = useAuth();

  if (loading) return <Loader />;

  return <div>{children}</div>;
};

export default PrivateRoute;
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
