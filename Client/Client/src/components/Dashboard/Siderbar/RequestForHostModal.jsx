import { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { requestForHost } from "../../../Api/users";
import toast from "react-hot-toast";
const RequestForHostModal = ({
  isModalOpen,
  setIsModalOpen,
  email,
  refetch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleConfirm = async () => {
    setIsModalOpen(false);
    try {
      const data = await toast.promise(
        requestForHost(email),
        {
          loading: "it's loading",
          success: "Request Successful",
          error: "Something went wrong! Please try again later",
        },
        {
          style: {
            height: "80px",
            minWidth: "300px",
            marginTop: "100px",
          },
        }
      );
      console.log(data);
      if (data.modifiedCount > 0) setIsOpen(true);
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
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
                <div className="flex flex-col items-center justify-center gap-4 w-full my-10">
                  <p className="font-semibold text-lg">
                    Request to become host?
                  </p>
                  <Disclosure>
                    <DisclosureButton
                      className={
                        "group flex items-center justify-between w-full px-4"
                      }
                    >
                      <p className="font-semibold">Why become a Host?</p>
                      <FaChevronUp
                        size={16}
                        className="group-data-[open]:rotate-180 "
                      />
                    </DisclosureButton>
                    <Transition
                      enter="duration-300 ease-out"
                      enterFrom="opacity-0 -translate-y-1"
                      enterTo="opacity-100 translate-y-1"
                      leave="duration-100 ease-out"
                      leaveFrom="opacity-100 translate-y-1"
                      leaveTo="opacity-0 -translate-y-1"
                    >
                      <DisclosurePanel className={"w-full"}>
                        <ol className="text-start pl-4 space-y-1">
                          <li className="flex items-center">
                            <GoDotFill />
                            Can host room.
                          </li>
                          <li className="flex items-center">
                            <GoDotFill />
                            Highly featured analytics page.
                          </li>
                          <li className="flex items-center">
                            <GoDotFill />
                            Earn money with referral.
                          </li>
                        </ol>
                      </DisclosurePanel>
                    </Transition>
                  </Disclosure>
                  <div className="flex items-center justify-evenly w-full ">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="font-semibold py-2 px-3 bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
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
      {/* confirmation box */}
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
                className={`h-[20vh] w-1/5 flex items-center justify-center space-y-4 border   rounded-xl bg-neutral-100`}
              >
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                  <p className="text-lg w-full text-center">
                    <span className="font-semibold text-green-500 block">
                      Congratulations!
                    </span>{" "}
                    Your request has been sent successfully.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-semibold py-2 px-3 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 rounded-xl"
                  >
                    Okay
                  </button>
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

RequestForHostModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  email: PropTypes.string,
  refetch: PropTypes.func,
};

export default RequestForHostModal;
