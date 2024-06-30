import SidebarItem from "../Siderbar/SidebarItem";
import { BsFillHouseAddFill, BsHousesFill } from "react-icons/bs";

const HostOptions = () => {
  return (
    <>
      <SidebarItem
        label="Analytics"
        icon={BsHousesFill}
        address={"./analytics/host"}
      />
      <SidebarItem
        label="myBookings"
        icon={BsFillHouseAddFill}
        address={"./my-bookings"}
      />
      <SidebarItem
        label="Add Rooms"
        icon={BsFillHouseAddFill}
        address={"./add-rooms"}
      />
      <SidebarItem
        label="Hosted Rooms"
        icon={BsHousesFill}
        address={"./hosted-rooms"}
      />
    </>
  );
};

export default HostOptions;
