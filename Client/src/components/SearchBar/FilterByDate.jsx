import {
  Button,
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { MdDateRange } from "react-icons/md";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import "./Calendar.css";
import { RxCross2 } from "react-icons/rx";
import { formatDateThree } from "../../Api/utils";
import "./SearchBar.css";
const FilterByDate = ({ saveSearchData }) => {
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

  useEffect(() => {
    saveSearchData("startDate", value?.startDate);
    saveSearchData("endDate", value?.endDate);
  }, [value]);
  return (
    <div className="w-full">
      <Popover className={"relative hidden lg:block"}>
        <PopoverButton className="text-xl w-full h-12 border border-black rounded-lg text-start hidden lg:flex items-center gap-1 px-4 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43]  ">
          <MdDateRange className="text-2xl" />
          <div>
            <h3 className="font-medium">Dates</h3>
            <p className="text-sm">
              {formatDateThree(value?.startDate)} -{" "}
              {formatDateThree(value?.endDate)}
            </p>
          </div>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom"
          className={
            "flex origin-top-left flex-col transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 [--anchor-offset:10.5rem] [--anchor-gap:-3.2rem]  shadow bg-white"
          }
        >
          <div className="flex flex-col items-end">
            <Calendar
              value={value}
              handleDateChange={handleDateChange}
              months={2}
            />
            <div className="w-full text-end">
              <CloseButton
                as={"button"}
                className="w-3/12 bg-sky-600 text-white font-bold  h-12  rounded-3xl mb-2"
              >
                Done
              </CloseButton>
            </div>
          </div>
        </PopoverPanel>
      </Popover>

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
              <DialogPanel className="h-full w-full md:w-[35rem] md:h-[31rem] md:rounded-xl bg-white  p-6 backdrop-blur-2xl  overflow-y-auto overflow-x-hidden flex flex-col justify-between">
                <div>
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
                </div>
                <button
                  onClick={closeModal}
                  className="w-full bg-sky-600 text-white font-bold  h-12  rounded-3xl "
                >
                  Done
                </button>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default FilterByDate;
