import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const RoomEditDialogBox = ({ isOpen, setIsOpen, handleDeleteRoom, roomId }) => {
  const [hoveringButton, setHoverButton] = useState(false);
  const hoveredButton = (button) => {
    if (hoveringButton === button) return true;
    else return false;
  };
  return (
    <Transition show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <TransitionChild
          show={isOpen}
          enter="transition-all transform duration-200"
          enterFrom="scale-0 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition-all transform duration-200"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-50 opacity-0"
        >
          <div className="fixed inset-0 flex items-center w-screen justify-center p-4">
            <DialogPanel
              className={`h-[20vh] w-1/5 flex items-center justify-center space-y-4 border   rounded-xl ${
                hoveringButton ? "bg-gray-300" : "bg-neutral-200"
              }`}
            >
              <div className="w-full h-1/2">
                <button
                  onMouseEnter={() => setHoverButton("button1")}
                  onMouseLeave={() => setHoverButton(null)}
                  className={` w-full h-1/2 font-semibold transition-color duration-150 border-b-[1px] ${
                    hoveredButton("button1") ? "bg-neutral-200" : "bg-gray-300"
                  }  text-green-600`}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteRoom(roomId)}
                  onMouseEnter={() => setHoverButton("button2")}
                  onMouseLeave={() => setHoverButton(null)}
                  className={` w-full h-1/2 font-semibold transition-color duration-150  ${
                    hoveredButton("button2") ? "bg-neutral-200" : "bg-gray-300"
                  } text-red-500 hover:text-red-600`}
                >
                  Delete
                </button>
              </div>
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

RoomEditDialogBox.propTypes = {};

export default RoomEditDialogBox;
