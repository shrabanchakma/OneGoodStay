import useUserData from "../../../Hooks/useUserData";
import AdminBottomNavOptions from "./AdminBottomNavOptions";
import "./BottomNavbar.css";
import { NavLink } from "react-router-dom";
import GuestBottomNavOptions from "./GuestBottomNavOptions";
const BottomNavbar = () => {
  const { userData } = useUserData();
  return (
    <nav className="bg-white shadow-xl fixed md:hidden bottom-0 h-14 left-0 right-0 ">
      <div className="w-full h-full flex items-center justify-around box-shadow">
        {userData?.role === "admin" && <AdminBottomNavOptions />}
        {userData?.role === "guest" && <GuestBottomNavOptions />}
      </div>
    </nav>
  );
};

export default BottomNavbar;
