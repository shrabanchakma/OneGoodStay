import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
const DropdownMenu = () => {
  return (
    <div className="">
      <Menu>
        <MenuButton className="p-3">
          <TiThMenu className="text-2xl" />
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
            className="w-52 origin-top-center  border rounded-lg bg-white min-h-14"
          >
            <MenuItem>
              <button className="hover:bg-slate-200  w-full px-2 py-[0.5px] transition ease-in-out ">
                <Link
                  to="/login"
                  className="text-xl flex justify-start items-center gap-2 font-medium"
                >
                  <RiLoginBoxFill className="text-lg" />
                  login
                </Link>
              </button>
            </MenuItem>
            <MenuItem>
              <Link to="/login">login</Link>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
