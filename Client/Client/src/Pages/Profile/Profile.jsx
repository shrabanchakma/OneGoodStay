import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      <p className="text-medium text-xl">This is profile page</p>
      <Link to="/login" className="bg-blue-500">
        Click here to log out
      </Link>
    </div>
  );
};

export default Profile;
