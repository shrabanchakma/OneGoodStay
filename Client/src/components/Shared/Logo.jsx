import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-1">
      <img src="/OneGoodStay-logo.png" alt="logo" className="h-12 w-12" />
      <h1 className="text-xl font-medium">OneGoodStay</h1>
    </Link>
  );
};

export default Logo;
