import useAuth from "../../../Hooks/useAuth";
import SidebarItem from "./SidebarItem";
import { TiUser } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import RequestForHostModal from "./RequestForHostModal";
import { useState } from "react";
import HostOptions from "../Host/HostOptions";
import GuestOptions from "../Guest/GuestOptions";
import AdminOptions from "../Admin/AdminOptions";
import useUserData from "../../../Hooks/useUserData";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
const Sidebar = () => {
  const { user, signOutUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData, refetch } = useUserData();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleRequestHost = () => {
    if (userData?.status === "requested")
      toast.error("Your request is pending please wait!");
    else setIsModalOpen(true);
  };
  return (
    <aside className="h-full flex flex-col justify-between ">
      <div>
        <Link
          to={"/"}
          data-tooltip-id="go-back"
          data-tooltip-delay-show={300}
          data-tooltip-content={"Go back"}
          data-tooltip-place="right"
          data-tooltip-variant="light"
          data-tooltip-float="false"
          className="flex items-center justify-center bg-white hover:bg-blue-200  h-8 w-8 rounded-full absolute top-2 left-3"
        >
          <FaArrowLeft size={20} className="text-blue-500" />
        </Link>
        <div className="min-h-20 flex flex-col items-center justify-center ">
          <h1 className="font-medium ">{userData?.name}</h1>
          <p className="font-light text-neutral-500">{userData?.email}</p>
        </div>
        <hr />

        <SidebarItem label="Profile" icon={TiUser} address={"./profile"} />
        {/* routes based on users */}
        {userData?.role === "admin" && <AdminOptions />}
        {userData?.role === "host" && <HostOptions />}
        {userData?.role === "guest" && <GuestOptions />}
      </div>

      {/* request for host */}
      <div>
        {userData?.role === "guest" && (
          <p
            onClick={handleRequestHost}
            className="underline text-blue-500 hover:text-blue-600 active:text-blue-700 text-center cursor-pointer font-semibold"
          >
            Request for Host
          </p>
        )}
        <button
          onClick={handleSignOut}
          className="text-sky-600 font-bold w-full h-12 rounded-3xl hover:text-sky-700 hover:bg-sky-100 active:bg-sky-200 transition-all duration-100 ease-in-out"
        >
          Sing Out
        </button>
      </div>
      <RequestForHostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        email={user?.email}
        refetch={refetch}
      />

      <Tooltip
        id="go-back"
        style={{ backgroundColor: "#e5e5e5", color: "#374151" }}
      />
    </aside>
  );
};

export default Sidebar;
