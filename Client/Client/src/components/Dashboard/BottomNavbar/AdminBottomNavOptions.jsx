import PropTypes from "prop-types";
import BottomNavOption from "./BottomNavOption";
import { FaUsers, FaChartLine, FaArrowLeft, FaUser } from "react-icons/fa";
import { TiUser } from "react-icons/ti";
const AdminBottomNavOptions = (props) => {
  return (
    <>
      <BottomNavOption path="/" icon={FaArrowLeft} />
      <BottomNavOption path="./analytics" icon={FaChartLine} />
      <BottomNavOption path="./all-users" icon={FaUsers} />
      <BottomNavOption path="./profile" icon={TiUser} />
    </>
  );
};

AdminBottomNavOptions.propTypes = {};

export default AdminBottomNavOptions;
