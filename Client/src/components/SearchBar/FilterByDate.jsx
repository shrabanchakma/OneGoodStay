import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { MdDateRange } from "react-icons/md";
import Calendar from "./Calendar";
import { useState } from "react";
import "./Calendar.css";
import { RxCross2 } from "react-icons/rx";
import { formatDateThree } from "../../Api/utils";
const FilterByDate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleDateChange = (ranges) => {
    console.log("range is-->", ranges);
    setValue({
      startDate: ranges.startDate,
      endDate: ranges.endDate,
      key: "selection",
    });
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full">
      <Menu>
        <MenuButton className="text-xl w-full h-12 border border-black rounded-lg text-start hidden lg:flex items-center gap-1 px-4 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43]  ">
          <MdDateRange className="text-2xl" />
          <div>
            <h3 className="font-medium">Dates</h3>
            <p className="text-sm">
              {formatDateThree(value?.startDate)} -{" "}
              {formatDateThree(value?.endDate)}
            </p>
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
            className="bg-white w-auto origin-top-left border-[1px] rounded-lg min-h-24"
          >
            <MenuItem>
              <Calendar
                value={value}
                handleDateChange={handleDateChange}
                months={2}
              />
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
      {/* for small screen */}
      <div className="relative block lg:hidden">
        <Button
          onClick={openModal}
          className="text-xl w-full h-12 border border-black rounded-lg text-start flex items-center gap-1 px-4 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43] "
        >
          <MdDateRange className="text-2xl" />{" "}
          <div>
            <h3 className="font-medium">Dates</h3>
            <p className="text-sm">May 20 - May 21</p>
          </div>
        </Button>

        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={closeModal}
        >
          <DialogBackdrop className={"fixed inset-0 bg-black/30"} />
          <div className="fixed inset-0 z-10  overflow-y-auto ">
            <div className="flex h-full items-center justify-center p-0 md:p-4">
              <DialogPanel className="h-full w-full md:w-[35rem] md:h-[30rem] md:rounded-xl bg-white  p-6 backdrop-blur-2xl  overflow-y-auto overflow-x-hidden">
                <button
                  onClick={closeModal}
                  className="flex items-center justify-center bg-white hover:bg-blue-200  h-8 w-8 rounded-full absolute left-1 top-3"
                >
                  <RxCross2 className="text-blue-500  text-[1.5rem]" />
                </button>
                <div
                  id="calendar-wrapper"
                  className="flex items-center justify-center mt-5"
                >
                  <Calendar
                    value={value}
                    handleDateChange={handleDateChange}
                    months={1}
                  />
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default FilterByDate;
