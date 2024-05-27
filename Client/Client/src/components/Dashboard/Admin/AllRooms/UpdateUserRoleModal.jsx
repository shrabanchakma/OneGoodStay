import PropTypes from "prop-types";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const UpdateUserRoleModal = ({ isOpen, setIsOpen, userName, userRole }) => {
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
              className={`h-[20vh] w-1/5 flex items-center justify-center space-y-4 border   rounded-xl bg-neutral-100`}
            >
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <p className="font-semibold text-lg block">Are you sure?</p>
                <p className="text-lg w-full text-center">
                  {`Change ${userName} user role to ${userRole}?`}
                </p>
                <div className="flex items-center justify-evenly w-full">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-semibold py-2 px-3 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-semibold py-2 px-3 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 rounded-xl"
                  >
                    Okay
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

UpdateUserRoleModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default UpdateUserRoleModal;
