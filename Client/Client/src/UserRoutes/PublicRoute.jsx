import useAuth from "../Hooks/useAuth";
import Loader from "../components/Shared/Loader";
import PropTypes from "prop-types";
const PublicRoute = ({ children }) => {
  // public route
  const { loading } = useAuth();

  if (loading) return <Loader />;

  return <div>{children}</div>;
};

export default PublicRoute;

PublicRoute.propTypes = {
  children: PropTypes.node,
};
