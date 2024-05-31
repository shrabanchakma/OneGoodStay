import PropTypes from "prop-types";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
const userRoles = ["Admin", "Guest", "Host"];
const UpdateUserRoleModal = ({
  isOpen,
  setIsOpen,
  user,
  handleChangeUserRole,
}) => {
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRoleSelection = (e) => {
    if (user?.role !== e.target.value.toLowerCase()) {
      setSelectedUserRole(e.target.value.toLowerCase());
      setIsModalOpen(true);
      setIsOpen(false);
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
                className={` w-1/5  space-y-4 border   rounded-xl bg-neutral-100`}
              >
                <div className="p-4 px-5 gap-4 w-full  ">
                  <div className=" w-full space-y-2">
                    {user?.status === "requested" && (
                      <>
                        <div className="w-9/12 mx-auto text-white bg-yellow-500 rounded-md p-1 px-2  text-center mb-1  ">
                          <span className=" ">
                            user requested to become host
                          </span>
                        </div>
                        <hr />
                      </>
                    )}

                    <div>
                      <h1 className="font-medium">Name</h1>
                      <p>{user?.name}</p>
                    </div>
                    <div>
                      <h1 className="font-medium">Email</h1>
                      <p>{user?.email}</p>
                    </div>
                    <div>
                      <h1 className="font-medium">Contact number</h1>
                      <p>
                        {user?.contactInfo?.number.toString() || "Not provided"}
                      </p>
                    </div>
                    {/* change user roles */}
                    <div className="w-full ">
                      <h1 className="font-medium">Change user role</h1>
                      <select
                        name="userRole"
                        id="userRole"
                        className="bg-neutral-200 py-1 px-3  rounded-xl border-[1px] w-full "
                        defaultValue={
                          user?.role &&
                          `${user?.role[0].toUpperCase()}${(user?.role).slice(
                            1
                          )}`
                        }
                        onClick={handleRoleSelection}
                      >
                        {userRoles.map((userRole, idx) => (
                          <option value={userRole} key={idx}>
                            {userRole}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
      {/* confirmation modal */}
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
                className={`h-36 w-1/5 flex items-center space-y-4 border   rounded-xl bg-neutral-100`}
              >
                <div className="p-4 px-5 gap-4 w-full space-y-10">
                  <h1 className="font-semibold">
                    Change role from{" "}
                    <span className="text-orange-500">
                      {user?.role && (user?.role).toUpperCase()}
                    </span>{" "}
                    to{" "}
                    <span className="text-red-500">
                      {selectedUserRole && selectedUserRole.toUpperCase()}
                    </span>
                  </h1>
                  <div className="flex items-center justify-around">
                    <button
                      onClick={() => {
                        handleChangeUserRole(user?.email, selectedUserRole);
                        setIsModalOpen(false);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-2 px-3 rounded-lg text-white "
                    >
                      confirm
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 p-2 px-3 rounded-lg text-white "
                    >
                      cancel
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

UpdateUserRoleModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default UpdateUserRoleModal;
