import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserData from "../Hooks/useUserData";
const AdminRoute = ({ children }) => {
  const { role } = useUserData();
  if (role === "admin") return children;
  return <Navigate to={"/dashboard/profile"} />;
};
AdminRoute.propTypes = { children: PropTypes.node };
export default AdminRoute;
