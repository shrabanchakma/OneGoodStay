import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const RoomEditDialogBox = ({
  isOpen,
  setIsOpen,
  handleDeleteRoom,
  roomId,
  status,
}) => {
  const [hoveringButton, setHoverButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const hoveredButton = (button) => {
    if (hoveringButton === button) return true;
    else return false;
  };
  const handleDeleteButton = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  const handleCancelButton = () => {
    setIsModalOpen(false);
    setIsOpen(true);
  };

  const handleUpdateButton = () => {
    if (status !== "booked") {
      navigate(`update/${roomId}`);
    }
  };
  return (
    <>
      <Transition show={isOpen}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
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
                className={`h-[20vh] w-1/5 flex items-center justify-center space-y-4 border   rounded-xl border-none ${
                  hoveringButton ? "bg-gray-600" : "bg-white"
                }`}
              >
                <div className="w-full h-1/2">
                  <button
                    onClick={handleUpdateButton}
                    data-tooltip-id="tooltip"
                    data-tooltip-delay-show={300}
                    data-tooltip-content={
                      status === "booked"
                        ? "You can not update. Room is already booked"
                        : "Update Room"
                    }
                    data-tooltip-place="right"
                    data-tooltip-variant={
                      status === "booked" ? "warning" : "light"
                    }
                    data-tooltip-float="false"
                    onMouseEnter={() => setHoverButton("button1")}
                    onMouseLeave={() => setHoverButton(null)}
                    className={` w-full h-1/2 font-semibold transition-color duration-150 border-b-[1px] ${
                      hoveredButton("button1") ? "bg-white" : "bg-gray-600"
                    } text-white  hover:text-green-600 active:bg-neutral-200 ${
                      status === "booked" && ""
                    } `}
                  >
                    Update
                  </button>
                  <button
                    data-tooltip-id="tooltip"
                    data-tooltip-delay-show={300}
                    data-tooltip-content={"Delete room"}
                    data-tooltip-place="right"
                    data-tooltip-variant="light"
                    data-tooltip-float="false"
                    onClick={handleDeleteButton}
                    onMouseEnter={() => setHoverButton("button2")}
                    onMouseLeave={() => setHoverButton(null)}
                    className={` w-full h-1/2 font-semibold transition-color duration-150  ${
                      hoveredButton("button2")
                        ? "bg-neutral-200"
                        : "bg-gray-600"
                    } text-white hover:text-red-600 `}
                  >
                    Delete
                  </button>
                  <Tooltip id="tooltip" />
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
      {/* delete modal box */}
      <Transition show={isModalOpen}>
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <TransitionChild
            show={isModalOpen}
            enter="transition-all transform duration-200"
            enterFrom="scale-0 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition-all transform duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-50 opacity-0"
          >
            <div className="fixed inset-0 flex items-center w-screen justify-center p-4">
              <DialogPanel
                className={`h-[20vh] w-1/5 flex items-center justify-center space-y-4 border   rounded-xl bg-white`}
              >
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                  <div className="w-full text-center">
                    <p className="font-semibold text-xl">Are you sure?</p>
                    <p className="text-[12px] w-full text-center text-gray-700">
                      This room will be permanently deleted
                    </p>
                  </div>
                  <div className="flex items-center justify-evenly w-full">
                    <button
                      onClick={handleCancelButton}
                      className="font-semibold py-2 px-3 bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      data-tooltip-id="confirm-delete"
                      data-tooltip-delay-show={300}
                      data-tooltip-content={"Confirm delete"}
                      data-tooltip-place="right"
                      data-tooltip-variant="warning"
                      data-tooltip-float="false"
                      onClick={() => handleDeleteRoom(roomId)}
                      className="font-semibold py-2 px-3 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 rounded-xl"
                    >
                      Confirm
                    </button>
                  </div>
                  <Tooltip id="confirm-delete" />
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

RoomEditDialogBox.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  handleDeleteRoom: PropTypes.func,
  roomId: PropTypes.string,
};

export default RoomEditDialogBox;
