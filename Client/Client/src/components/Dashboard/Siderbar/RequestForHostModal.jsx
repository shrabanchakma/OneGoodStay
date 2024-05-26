import React from "react";
import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const RequestForHostModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
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
              className={`min-h-[20vh] w-1/5 flex items-center justify-center space-y-4 border   rounded-xl bg-neutral-100`}
            >
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <p className="font-semibold text-lg">Are you sure?</p>
                <Disclosure>
                  <DisclosureButton
                    className={"group flex items-center justify-between w-full"}
                  >
                    <p className="font-semibold">Why become a Host?</p>
                    <FaChevronUp
                      size={16}
                      className="group-data-[open]:rotate-180 "
                    />
                  </DisclosureButton>
                  <Transition
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-1"
                    leave="duration-300 ease-out"
                    leaveFrom="opacity-100 translate-y-1"
                    leaveTo="opacity-0 -translate-y-1"
                  >
                    <DisclosurePanel className={"block"}>
                      <ol>
                        <li>Can host room</li>
                        <li>Highly featured analytics page</li>
                        <li>Earn money with referral</li>
                      </ol>
                    </DisclosurePanel>
                  </Transition>
                </Disclosure>
                <div className="flex items-center justify-evenly w-full">
                  <button
                    // onClick={handleCancelButton}
                    className="font-semibold py-2 px-3 bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    // onClick={() => handleDeleteRoom(roomId)}
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
  );
};

RequestForHostModal.propTypes = {};

export default RequestForHostModal;
