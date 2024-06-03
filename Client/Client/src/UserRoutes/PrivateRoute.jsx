import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../components/Shared/Loader";
import PropTypes from "prop-types";
const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  if (loading) return <Loader />;
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
