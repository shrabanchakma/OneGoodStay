import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const FilterByGuestNumbers = () => {
  return (
    <div className="w-full">
      <Menu>
        <MenuButton className="text-xl w-full h-12 border border-black rounded-lg text-start flex items-center gap-1 px-4 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43]">
          <FaUser className="text-2xl" />
          <div>
            <h3 className="font-medium">Travelers</h3>
            <p className="text-sm">10 Travelers</p>
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
            className="bg-white w-[380px] origin-top-left border-[1px] rounded-lg h-24"
          >
            <MenuItem>
              <div className="flex items-center justify-between px-3  h-full">
                <p className="text-xl">Guests</p>
                <div className="flex items-center gap-2">
                  <CiCircleMinus className="text-4xl" />
                  0
                  <CiCirclePlus className="text-4xl" />
                </div>
              </div>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default FilterByGuestNumbers;
