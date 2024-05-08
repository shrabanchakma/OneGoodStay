import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-24 border">
      <Logo />
      <div className="flex items-center gap-3">
        <Link to="/support" className="text-lg font-medium">
          Support
        </Link>
        <Link to="/about-us" className="text-lg font-medium">
          About us
        </Link>
        {/* dropdown menu */}
        <DropdownMenu />
      </div>
    </nav>
  );
};

export default Navbar;
