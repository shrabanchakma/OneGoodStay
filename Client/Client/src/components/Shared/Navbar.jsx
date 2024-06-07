import { Link, NavLink } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Logo from "./Logo";
import Container from "./Container";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef } from "react";
const Navbar = () => {
  return (
    <>
      <Container>
        <div className="navbar h-32 bg-base-100">
          <div className="navbar-start">
            {/* small screen */}
            <Menu>
              <MenuButton>
                <GiHamburgerMenu size={24} className="mx-3 lg:hidden" />
              </MenuButton>
              <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100 "
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
              >
                <MenuItems
                  anchor="button end"
                  className="z-10 min-w-80 px-3 py-3 origin-top-center flex flex-col justify-center gap-1  border rounded-lg bg-white min-h-14 "
                >
                  <MenuItem>
                    <Link
                      to="/support"
                      className="text-lg font-medium text-[#e41b43]"
                    >
                      Support
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/about-us"
                      className="text-lg font-medium text-[#e41b43]"
                    >
                      About us
                    </Link>
                  </MenuItem>
                  {/* dropdown menu */}

                  <DropdownMenu />
                </MenuItems>
              </Transition>
            </Menu>
            <Logo />
          </div>
          <div className="navbar-end hidden lg:flex">
            {/* big screen */}
            <div className="">
              <ol className="flex items-center gap-3">
                <li>
                  <NavLink
                    to="/support"
                    className="text-lg font-medium text-[#e41b43]"
                  >
                    Support
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about-us"
                    className="text-lg font-medium text-[#e41b43] whitespace-nowrap"
                  >
                    About us
                  </NavLink>
                </li>
                {/* dropdown menu */}
                <DropdownMenu />
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
