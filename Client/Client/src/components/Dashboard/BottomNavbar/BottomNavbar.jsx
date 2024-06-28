import AdminBottomNavOptions from "./AdminBottomNavOptions";
import "./BottomNavbar.css";
import { NavLink } from "react-router-dom";
const BottomNavbar = () => {
  return (
    <nav className="bg-white shadow-xl fixed md:hidden bottom-0 h-14 left-0 right-0 ">
      <div className="w-full h-full flex items-center justify-around box-shadow">
        <AdminBottomNavOptions />
      </div>
    </nav>
  );
};

export default BottomNavbar;
