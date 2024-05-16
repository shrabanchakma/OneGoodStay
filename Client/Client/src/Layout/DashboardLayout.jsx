import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Siderbar/Sidebar";
import Navbar from "../components/Shared/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1110px] min-h-[calc(100vh-193px)] mx-auto flex">
        <div className="w-1/3 min-h-full">
          <Sidebar />
        </div>
        <div className=" w-2/3 flex items-center justify-center min-h-full border rounded-xl mx-10">
          <div className="w-11/12 h-full rounded-xl ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
