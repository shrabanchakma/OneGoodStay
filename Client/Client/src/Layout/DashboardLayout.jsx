import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Siderbar/Sidebar";
import Navbar from "../components/Shared/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1280px] min-h-[calc(100vh-193px)] mx-auto flex gap-3">
        <div className="w-1/3 h-[80vh]">
          <Sidebar />
        </div>
        <div className="w-full h-full border">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
