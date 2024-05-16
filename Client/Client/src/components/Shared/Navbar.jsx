import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="w-full mx-auto bg-white border-b-[1px] border-gray-300 drop-shadow-xl mb-12">
      <nav className="flex justify-between items-center h-24  max-w-[1280px] mx-auto">
        <Logo />
        <div className="flex items-center gap-3 ">
          <Link to="/support" className="text-lg font-medium text-[#e41b43]">
            Support
          </Link>
          <Link to="/about-us" className="text-lg font-medium text-[#e41b43]">
            About us
          </Link>
          {/* dropdown menu */}
          <DropdownMenu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
