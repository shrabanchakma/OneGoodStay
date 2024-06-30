import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import PropTypes from "prop-types";
const userRoles = ["guest", "host", "admin"];

const UserRoleDropdown = ({ handleConfirmButton, email, name, role }) => {
  return (
    <Listbox>
      <ListboxButton className={"w-24 "}>
        {role === "host" && (
          <p className="py-1 px-3  font-semibold bg-green-500 text-white hover:bg-green-600 active:bg-green-700 rounded-t-sm  ">
            {role}
          </p>
        )}
        {role === "admin" && (
          <p className="py-1 px-3 font-semibold bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-xl ">
            {role}
          </p>
        )}
        {role === "guest" && (
          <p className="py-1 px-3 font-semibold bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 rounded-xl ">
            {role}
          </p>
        )}
        {role === "requested" && (
          <p className="py-1 px-3 font-semibold bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 rounded-xl ">
            {role}
          </p>
        )}
      </ListboxButton>
      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative">
          <ListboxOptions className={"bg-green-500 absolute rounded-sm w-24 "}>
            {userRoles.map((role) => (
              <ListboxOption
                onClick={() => handleConfirmButton(name, email, role)}
                key={role}
                value={role}
              >
                {role}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Transition>
    </Listbox>
  );
};

UserRoleDropdown.propTypes = {
  handleConfirmButton: PropTypes.func,
  email: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
};

export default UserRoleDropdown;
