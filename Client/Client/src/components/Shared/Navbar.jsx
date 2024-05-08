import DropdownMenu from "./DropdownMenu";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-24 border">
      <Logo />
      {/* dropdown menu */}
      <DropdownMenu />
    </nav>
  );
};

export default Navbar;
