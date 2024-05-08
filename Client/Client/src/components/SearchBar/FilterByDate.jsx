import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { MdDateRange } from "react-icons/md";

const FilterByDate = () => {
  return (
    <div className="w-full">
      <Menu>
        <MenuButton className="text-xl w-full h-12 border border-black rounded-lg text-start flex items-center gap-1 px-4">
          <MdDateRange className="text-2xl" />
          <div>
            <h3 className="font-medium">Dates</h3>
            <p className="text-sm">May 20 - May 21</p>
          </div>
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
            className="bg-white w-1/5 origin-top-left border-[1px] rounded-lg min-h-24"
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

export default FilterByDate;
