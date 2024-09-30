import { DialogPanel, Dialog, Button, DialogBackdrop } from "@headlessui/react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { HiAdjustments } from "react-icons/hi";
const FilteringAndSorting = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  console.log("close button ref is--->", closeBtnRef.current);
  console.log("isOPen is--->", isOpen);
  return (
    <div>
      <Button
        onClick={openModal}
        className={`w-[20rem] flex justify-center items-center gap-2  bg-white text-[#1668E3] font-bold  h-10 rounded-3xl border-[1px] border-gray-400 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43]
          } `}
      >
        <HiAdjustments size={20} className="rotate-90" />
        Sort & filter
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
            <DialogPanel className="h-full w-full md:w-[42rem] md:h-[42rem] md:rounded-xl bg-white  p-6 backdrop-blur-2xl  overflow-y-auto overflow-x-hidden">
              <div className="flex items-center justify-center  gap-2 bg-white  absolute left-5 top-3">
                <button
                  onClick={closeModal}
                  ref={closeBtnRef}
                  className="grid grid-cols-1 place-items-center hover:bg-blue-200 h-8 w-8 rounded-full"
                >
                  <RxCross2 className="text-blue-500  text-[1.5rem]" />
                </button>
                <span className="whitespace-nowrap text-gray-700 font-bold ">
                  Sort & filter
                </span>
              </div>

              <div className="border-b flex items-center justify-between mt-5 px-3">
                hi
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

FilteringAndSorting.propTypes = {};

export default FilteringAndSorting;
