import BottomNavOption from "./BottomNavOption";
import { IoStatsChart } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BsFillHouseAddFill, BsHousesFill } from "react-icons/bs";
const HostBottomNavOptions = (props) => {
  return (
    <>
      <BottomNavOption path="./my-bookings" icon={BsHousesFill} />
      <BottomNavOption path="./analytics" icon={IoStatsChart} />
      <BottomNavOption path="./add-rooms" icon={BsFillHouseAddFill} />
      <BottomNavOption path="./hosted-rooms" icon={BsHousesFill} />
      <BottomNavOption path="./profile" icon={FaUser} />
    </>
  );
};

HostBottomNavOptions.propTypes = {};

export default HostBottomNavOptions;
