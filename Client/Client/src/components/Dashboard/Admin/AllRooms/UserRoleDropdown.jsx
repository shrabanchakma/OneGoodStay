import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { useState } from "react";
const userRoles = ["guest", "host", "admin"];
const UserRoleDropdown = ({ handleChangeUserRole }) => {
  const [userRole, setUserRole] = useState(userRoles[0]);
  console.log(userRole);
  return (
    <Listbox value={userRole} setValue={setUserRole}>
      <ListboxButton>press me</ListboxButton>
      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ListboxOptions>
          {userRoles.map((role) => (
            <ListboxOption key={role} value={role}>
              {role}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Transition>
    </Listbox>
  );
};

export default UserRoleDropdown;
