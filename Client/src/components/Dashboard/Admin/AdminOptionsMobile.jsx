import { Link } from "react-router-dom";

const AdminOptionsMobile = () => {
  return (
    <div className="px-4">
      <ul className="font-medium">
        <li className="py-2 active:bg-neutral-100">
          <Link to="./analytics/admin">Analytics</Link>
        </li>
        <li className="py-2 active:bg-neutral-100">
          <Link to="./all-users">All users</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminOptionsMobile;
