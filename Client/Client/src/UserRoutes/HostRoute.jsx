import { Navigate } from "react-router-dom";
import useUserRole from "../Hooks/useUserRole";
import PropTypes from "prop-types";
const HostRoute = ({ children }) => {
  // todo: update navigate , send user from where he came from
  const [role] = useUserRole();
  if (role === "host") return children;
  return <Navigate to={"/dashboard/profile"} />;
};
HostRoute.propTypes = { children: PropTypes.node };
export default HostRoute;
