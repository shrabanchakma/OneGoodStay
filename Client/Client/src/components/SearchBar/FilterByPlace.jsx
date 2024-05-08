import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { IoLocationSharp } from "react-icons/io5";
const FilterByPlace = () => {
  return (
    <div className="w-full">
      <Menu>
        <MenuButton className="text-xl w-full h-12 border border-black rounded-lg text-start flex items-center gap-1 px-4 data-[active]:border-none data-[active]:outline data-[active]:outline-sky-500">
          <IoLocationSharp />
          Where to?
        </MenuButton>
        <Transition
          enter="transition ease-out duration-95"
          leave="transition ease-in duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom"
            className="bg-white w-[380px] origin-top-left border-[1px] rounded-lg min-h-24"
          >
            <MenuItem>
              <button className="hover:bg-slate-200  w-full px-2 py-[0.5px] transition ease-in-out ">
                <button className="text-xl flex justify-start items-center gap-2 font-medium">
                  1.Dhaka
                </button>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="hover:bg-slate-200  w-full px-2 py-[0.5px] transition ease-in-out ">
                <button className="text-xl flex justify-start items-center gap-2 font-medium">
                  2.Rajshahi
                </button>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="hover:bg-slate-200  w-full px-2 py-[0.5px] transition ease-in-out ">
                <button className="text-xl flex justify-start items-center gap-2 font-medium">
                  3.Khagrachari
                </button>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default FilterByPlace;
