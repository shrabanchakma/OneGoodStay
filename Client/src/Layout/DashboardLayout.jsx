import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Siderbar/Sidebar";
import BottomNavbar from "../components/Dashboard/BottomNavbar/BottomNavbar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="lg:flex gap-3 ">
        <Sidebar />
        <div className="w-full lg:w-3/4 pb-14 md:pb-0">
          <Outlet />
        </div>
      </div>
      {/* for small screens */}
      <BottomNavbar />
    </div>
  );
};

export default DashboardLayout;
