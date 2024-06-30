import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserData from "../Hooks/useUserData";
const AdminRoute = ({ children }) => {
  const { userData } = useUserData();
  if (userData?.role === "admin") return children;
  return <Navigate to={"/dashboard/profile"} />;
};
AdminRoute.propTypes = { children: PropTypes.node };
export default AdminRoute;
