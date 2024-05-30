import useAuth from "../../../Hooks/useAuth";
import SidebarItem from "./SidebarItem";
import { TiUser } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import RequestForHostModal from "./RequestForHostModal";
import { useState } from "react";
import HostOptions from "../Host/HostOptions";
import GuestOptions from "../Guest/GuestOptions";
import AdminOptions from "../Admin/AdminOptions";
import useUserData from "../../../Hooks/useUserData";
import toast from "react-hot-toast";
const Sidebar = () => {
  const { user, signOutUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData, refetch } = useUserData();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleRequestHost = () => {
    if (userData?.role === "requested")
      toast.error("Your request is pending please wait!");
    else setIsModalOpen(true);
  };
  return (
    <aside className="h-full flex flex-col justify-between">
      <div>
        <div className="min-h-20 flex flex-col items-center justify-center ">
          <h1 className="font-medium ">{user?.displayName}</h1>
          <p className="font-light text-neutral-500">{user?.email}</p>
        </div>
        <hr />

        <SidebarItem label="Profile" icon={TiUser} address={"./profile"} />
        {/* routes based on users */}
        {userData?.role === "host" ? <HostOptions /> : <GuestOptions />}
        {userData?.role === "admin" && <AdminOptions />}
      </div>

      {/* sign out button */}
      <div>
        {(userData?.role === "guest" || userData?.role === "requested") && (
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
    </aside>
  );
};

export default Sidebar;
