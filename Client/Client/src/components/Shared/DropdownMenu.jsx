import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
const DropdownMenu = () => {
  return (
    <Menu>
      <MenuButton>Press Me</MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <Link to="/login">login</Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
