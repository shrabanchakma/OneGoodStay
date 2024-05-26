import { FaUsers } from "react-icons/fa";
import SidebarItem from "../Siderbar/SidebarItem";

const AdminOptions = () => {
  // todo: add analytics page for admin
  return (
    <SidebarItem label="All Users" icon={FaUsers} address={"./all-users"} />
  );
};

export default AdminOptions;
