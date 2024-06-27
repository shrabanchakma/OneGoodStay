import { Link } from "react-router-dom";

const GuestOptionMobile = () => {
  return (
    <div className="px-4">
      <ul className="font-medium">
        <li className="py-2 active:bg-neutral-100">
          <Link to="./my-bookings">My Bookings</Link>
        </li>
      </ul>
    </div>
  );
};

export default GuestOptionMobile;
