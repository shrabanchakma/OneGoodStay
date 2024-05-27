import { Navigate } from "react-router-dom";
import useUserRole from "../Hooks/useUserRole";
import PropTypes from "prop-types";
const AdminRoute = ({ children }) => {
  const [role] = useUserRole();
  if (role === "admin") return children;
  return <Navigate to={"/dashboard/profile"} />;
};
AdminRoute.propTypes = { children: PropTypes.node };
export default AdminRoute;
