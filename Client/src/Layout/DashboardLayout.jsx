import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Siderbar/Sidebar";
import BottomNavbar from "../components/Dashboard/BottomNavbar/BottomNavbar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="md:flex   gap-3 ">
        <Sidebar />
        <div className="w-full pb-14 md:pb-0">
          <Outlet />
        </div>
      </div>
      {/* for small screens */}
      <BottomNavbar />
    </div>
  );
};

export default DashboardLayout;
