import PropTypes from "prop-types";
import BottomNavOption from "./BottomNavOption";
import { IoStatsChart } from "react-icons/io5";
import { FaUsers, FaArrowLeft, FaUser } from "react-icons/fa";
import { BsFillHouseAddFill } from "react-icons/bs";
import { TiUser } from "react-icons/ti";
const GuestBottomNavOptions = (props) => {
  return (
    <>
      <BottomNavOption path="/" icon={FaArrowLeft} />
      <BottomNavOption path="./analytics/guest" icon={IoStatsChart} />
      <BottomNavOption path="./my-bookings" icon={BsFillHouseAddFill} />
      <BottomNavOption path="./profile" icon={TiUser} />
    </>
  );
};

GuestBottomNavOptions.propTypes = {};

export default GuestBottomNavOptions;
