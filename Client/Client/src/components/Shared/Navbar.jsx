import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Logo from "./Logo";
import Container from "./Container";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <Link to="/support" className="text-lg font-medium text-[#e41b43]">
          Support
        </Link>
      </li>
      <li>
        <Link to="/about-us" className="text-lg font-medium text-[#e41b43]">
          About us
        </Link>
      </li>
      {/* dropdown menu */}
      <DropdownMenu />
    </>
  );
  return (
    <>
      <Container>
        <div className="navbar h-32 bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              {/* small screen */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <a href="/" className="text-xl">
              <Logo />
            </a>
          </div>
          <div className="navbar-end hidden lg:flex">
            {/* big screen */}
            <div>
              <ol className="flex items-center gap-3">{navItems}</ol>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
