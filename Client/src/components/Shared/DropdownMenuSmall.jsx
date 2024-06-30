import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { dropdownOptionsData } from "./DropdownData";
import { FaChevronDown } from "react-icons/fa";
const DropdownMenuSmall = () => {
  const { user, signOutUser } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full">
      {user ? (
        <Menu>
          <MenuButton className="group w-full flex items-center justify-between">
            <div className="text-lg font-medium text-[#e41b43]  w-full text-start   ">
              {user && user.displayName.split(" ")[0]}
            </div>
            <FaChevronDown className="lg:hidden group-data-[active]:-rotate-90 transition-all duration-100 ease-in-out text-[#e41b43]" />
          </MenuButton>
          <Transition
            enter="transition ease-out duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100 "
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            {/* for large screen */}
            <MenuItems
              anchor="right start"
              className=" lg:hidden z-10 min-w-80 px-3 py-3 origin-top-center  border rounded-lg bg-white min-h-14"
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
              {user && (
                <>
                  {dropdownOptionsData.map((option) => (
                    <MenuItem key={option?.id}>
                      <button
                        key={option?.id}
                        className="hover:bg-[#FBF8F1]  w-full px-2 py-[0.5px] transition ease-in-out "
                      >
                        <Link
                          to={option?.path}
                          className="text-lg   h-10 flex justify-start items-center gap-2 px-3 "
                        >
                          {option?.label}
                        </Link>
                      </button>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <button
                      onClick={handleSignOut}
                      className="hover:bg-[#FBF8F1]  w-full py-[0.5px] transition ease-in-out text-lg h-10 flex justify-start items-center gap-2 px-5"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Transition>
        </Menu>
      ) : (
        <Link
          to={"/login"}
          className="p-3 text-lg font-medium text-[#e41b43] w-full"
        >
          SignIn
        </Link>
      )}
    </div>
  );
};

export default DropdownMenuSmall;
