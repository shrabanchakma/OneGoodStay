import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { changeUserRole, getAllUsers } from "../../../../Api/users";
import AllUserDataRow from "./AllUserDataRow";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserRoleDropdown from "./UserRoleDropdown";
import UpdateUserRoleModal from "./UpdateUserRoleModal";
const userRoles = ["All", "admin", "guest", "host"];
const AllUsersListings = () => {
  const [userFilterRole, setUserFilterRole] = useState("");
  // set state to change user role
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { data: users = [], refetch } = useQuery({
    queryKey: ["admin", "allUsers"],
    queryFn: async () => {
      const data = await getAllUsers();
      setFilteredUsers(data);
      return data;
    },
  });
  useEffect(() => {
    if (userFilterRole === "All" || userFilterRole === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user?.role === userFilterRole);
      setFilteredUsers(filtered);
    }
  }, [userFilterRole]);

  // change user role
  const handleChangeUserRole = async () => {
    try {
      const data = await toast.promise(changeUserRole(userEmail, userRole), {
        loading: "Saving changes...",
        success: "User role changed successfully",
        error: <p className="text-red-500">An error occurred</p>,
      });
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  // handle user role change confirm button
  const handleConfirmButton = (email, role) => {
    setUserEmail(email);
    setUserRole(role);
    setIsOpen(true);
  };

  // todo: add filter based on user name;
  return (
    <>
      <Helmet>
        <title>Dashboard | Users</title>
      </Helmet>

      <div className="container mx-auto ">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto  ">
            <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
              <select
                name="userRole"
                id=""
                className="bg-neutral-200 py-1 px-3 mx-4 rounded-xl border-[1px]"
                defaultValue="All"
                onChange={(e) => setUserFilterRole(e.target.value)}
              >
                {userRoles.map((userRole, idx) => (
                  <option value={userRole} key={idx}>
                    {userRole}
                  </option>
                ))}
              </select>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Hosted Room row data */}
                  {filteredUsers.map((user) => (
                    <AllUserDataRow
                      key={user?._id}
                      user={user}
                      handleChangeUserRole={handleChangeUserRole}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <UpdateUserRoleModal handleChangeUserRole={handleChangeUserRole} />
      </div>
    </>
  );
};

export default AllUsersListings;
