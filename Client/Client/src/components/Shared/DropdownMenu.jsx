import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import { IoPersonCircle } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
const DropdownMenu = () => {
  const { user } = useAuth();
  return (
    <div className="">
      <Menu>
        <MenuButton className="p-3">
          {user ? (
            <div className="text-lg font-medium text-[#e41b43]">
              {user && user.displayName.split(" ")[0]}
            </div>
          ) : (
            <Link to={"/login"} className="text-lg font-medium text-[#e41b43]">
              SignIn
            </Link>
          )}
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100 "
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <MenuItems
            anchor="bottom end"
            className="min-w-80 px-3 py-3 origin-top-center  border rounded-lg bg-white min-h-14"
          >
            {/* user menu items */}
            {user && (
              <MenuItem>
                <div className="h-16 text-center">
                  <h1 className="font-medium ">{user?.displayName}</h1>
                  <p className="font-light text-neutral-500">{user?.email}</p>
                  <hr />
                </div>
              </MenuItem>
            )}

            <MenuItem>
              {user ? (
                <button className="hover:bg-slate-200  w-full px-2 py-[0.5px] transition ease-in-out ">
                  <Link
                    to="/dashboard/profile"
                    className="text-xl flex justify-start items-center gap-2 font-medium"
                  >
                    <IoPersonCircle color={"#4c9cf1"} className="text-lg" />
                    Account
                  </Link>
                </button>
              ) : (
                <button className="hover:bg-slate-200  w-full px-2 py-[0.5px] transition ease-in-out ">
                  <Link
                    to="/login"
                    className="text-xl flex justify-start items-center gap-2 font-medium"
                  >
                    <RiLoginBoxFill className="text-lg" />
                    login
                  </Link>
                </button>
              )}
            </MenuItem>
            <MenuItem>
              <p>example</p>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
