import useAuth from "../../../Hooks/useAuth";
import SidebarItem from "./SidebarItem";
import { TiUser } from "react-icons/ti";
const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="h-full ">
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
    </div>
  );
};

export default Sidebar;
