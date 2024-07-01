import BottomNavOption from "./BottomNavOption";
import { IoStatsChart } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillHouseAddFill } from "react-icons/bs";
import { TiUser } from "react-icons/ti";
const GuestBottomNavOptions = () => {
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
