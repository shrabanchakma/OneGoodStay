import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserData from "../Hooks/useUserData";
const HostRoute = ({ children }) => {
  const { userData } = useUserData();
  if (userData?.role === "host") return children;
  return <Navigate to={"/dashboard/profile"} />;
};
HostRoute.propTypes = { children: PropTypes.node };
export default HostRoute;
