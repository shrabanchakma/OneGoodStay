import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const ConfirmUpdateBox = ({ isOpen, setIsOpen, handleUpdate, formData }) => {
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
                <p className="font-semibold text-lg">Are you sure?</p>
                <div className="flex items-center justify-evenly w-full">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-semibold py-2 px-3 bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdate(formData)}
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

export default ConfirmUpdateBox;
