import {
  Button,
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
import { FaUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "./SearchBar.css";
const FilterByGuestNumbers = ({ saveSearchData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleRoomCount = (operator) => {
    if (operator === "+") setRoomCount((prev) => ++prev);
    else
      setRoomCount((prev) => {
        if (prev !== 0) return --prev;
        else return 0;
      });
  };
  const handleGuestCount = (operator) => {
    if (operator === "+") setGuestCount((prev) => ++prev);
    else
      setGuestCount((prev) => {
        if (prev !== 0) return --prev;
        else return 0;
      });
  };

  useEffect(() => {
    saveSearchData("guestCount", guestCount);
    saveSearchData("roomCount", roomCount);
  }, [roomCount, guestCount]);

  return (
    <div className="w-full flex-grow">
      <Popover className={"relative hidden md:block"}>
        <PopoverButton className="text-xl w-full h-12 border border-gray-400 rounded-lg text-start flex items-center gap-1 px-4 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43]">
          <FaUser className="text-2xl" />
          <div>
            <h3 className="font-medium mb-0 ">Guests</h3>
            <div className="flex items-center gap-1">
              <p className="text-sm ">{guestCount} guests,</p>
              <p className="text-sm ">{roomCount} room</p>
            </div>
          </div>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom"
          className={
            "flex origin-top-left flex-col transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 [--anchor-offset:-5rem] lg:[--anchor-offset:-3.2rem] xl:[--anchor-offset:-1.2rem] [--anchor-gap:1rem]  w-[22rem] shadow bg-white rounded-md"
          }
        >
          <div className="flex items-center justify-between px-3  py-4">
            <p className="text-xl">Guests</p>
            <div className="flex items-center gap-2">
              <CiCircleMinus
                onClick={() => handleGuestCount("-")}
                className="text-4xl"
              />
              {guestCount}
              <CiCirclePlus
                onClick={() => handleGuestCount("+")}
                className="text-4xl"
              />
            </div>
          </div>
          <div className="flex items-center justify-between px-3  py-4">
            <p className="text-xl">Rooms</p>
            <div className="flex items-center gap-2">
              <button onClick={() => handleRoomCount("-")}>
                <CiCircleMinus className="text-4xl" />
              </button>
              {roomCount}
              <button onClick={() => handleRoomCount("+")}>
                <CiCirclePlus className="text-4xl" />
              </button>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
      {/* for small screens */}
      <div className="md:hidden">
        <Button
          onClick={openModal}
          className="text-xl w-full h-12 border border-gray-400 rounded-lg text-start flex items-center gap-1 px-4 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43]"
        >
          <FaUser className="text-2xl" />
          <div>
            <h3 className="font-medium">Travelers</h3>
            <p className="text-sm">10 Travelers</p>
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
              <DialogPanel className="h-full w-full md:w-[35rem] md:h-[42rem] md:rounded-xl bg-white  p-6 backdrop-blur-2xl  overflow-y-auto overflow-x-hidden flex flex-col justify-between">
                <div>
                  {" "}
                  <button
                    onClick={closeModal}
                    className="flex items-center justify-center bg-white hover:bg-blue-200  h-8 w-8 rounded-full absolute left-3 top-3"
                  >
                    <RxCross2 className="text-blue-500  text-[1.5rem]" />
                  </button>
                  <div className=" flex flex-col items-center justify-between mt-10 px-3   w-full">
                    <div className="flex items-center justify-between px-3  py-4 w-full">
                      <p className="text-xl">Guests</p>
                      <div className="flex items-center gap-2 ">
                        <CiCircleMinus
                          onClick={() => handleGuestCount("-")}
                          className="text-4xl"
                        />
                        {guestCount}
                        <CiCirclePlus
                          onClick={() => handleGuestCount("+")}
                          className="text-4xl"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-3  py-4 w-full">
                      <p className="text-xl">Rooms</p>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleRoomCount("-")}>
                          <CiCircleMinus className="text-4xl" />
                        </button>
                        {roomCount}
                        <button onClick={() => handleRoomCount("+")}>
                          <CiCirclePlus className="text-4xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-full md:w-1/2 bg-sky-600 text-white font-bold  h-12 rounded-3xl "
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

export default FilterByGuestNumbers;
