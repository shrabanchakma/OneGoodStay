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
                  hoveringButton ? "bg-gray-600" : "bg-neutral-200"
                }`}
              >
                <div className="w-full h-1/2">
                  <button
                    onClick={handleUpdateButton}
                    data-tooltip-id="tooltip"
                    data-tooltip-delay-show={300}
                    onMouseEnter={() => setHoverButton("button1")}
                    onMouseLeave={() => setHoverButton(null)}
                    className={` w-full h-1/2 font-semibold transition-color duration-150 border-b-[1px] ${
                      hoveredButton("button1")
                        ? "bg-neutral-200"
                        : "bg-gray-600"
                    } text-white  hover:text-green-600 ${
                      status === "booked" && "cursor-not-allowed"
                    } `}
                  >
                    Update
                  </button>
                  <button
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
                  <Tooltip
                    id="tooltip"
                    place="right"
                    content={
                      status === "booked"
                        ? "You can not update. Room is already booked"
                        : "Update Room"
                    }
                    variant="light"
                    style={{
                      backgroundColor: "rgb(229 229 229)",
                    }}
                  />
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
                className={`h-[20vh] w-1/5 flex items-center justify-center space-y-4 border   rounded-xl bg-neutral-100`}
              >
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                  <p className="font-semibold text-lg">Are you sure?</p>
                  <div className="flex items-center justify-evenly w-full">
                    <button
                      onClick={handleCancelButton}
                      className="font-semibold py-2 px-3 bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(roomId)}
                      className="font-semibold py-2 px-3 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 rounded-xl"
                    >
                      Confirm
                    </button>
                  </div>
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
