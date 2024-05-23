import useAuth from "../../../Hooks/useAuth";
import SidebarItem from "./SidebarItem";
import { TiUser } from "react-icons/ti";
import { BsFillHouseAddFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="min-h-20 flex flex-col items-center justify-center ">
          <h1 className="font-medium ">{user?.displayName}</h1>
          <p className="font-light text-neutral-500">{user?.email}</p>
        </div>
        <hr />

        <SidebarItem
          label="Profile"
          icon={TiUser}
          address={"/dashboard/profile"}
        />
        <SidebarItem
          label="Add Rooms"
          icon={BsFillHouseAddFill}
          address={"/dashboard/add-rooms"}
        />
      </div>

      {/* sign out button */}
      <button
        onClick={handleSignOut}
        className="text-sky-600 font-bold w-full h-12 rounded-3xl hover:text-sky-700 hover:bg-sky-100 active:bg-sky-200 transition-all duration-100 ease-in-out"
      >
        Sing Out
      </button>
    </div>
  );
};

export default Sidebar;
