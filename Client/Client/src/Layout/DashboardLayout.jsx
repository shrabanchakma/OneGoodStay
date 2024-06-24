import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Siderbar/Sidebar";
import Navbar from "../components/Shared/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="min-h-screen mx-auto flex gap-3">
        <div className="w-[25rem] min-h-full py-10">
          <Sidebar />
        </div>
        <div className="w-full min-h-full border">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
