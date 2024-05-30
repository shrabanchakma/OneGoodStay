import { Link } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";
import Loader from "../../Shared/Loader";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { userData, isLoading } = useUserData();
  let date = new Date(userData?.dateOfBirth);
  const padValue = (value) => value.toString().padStart(2, "0");
  date = `${padValue(date.getDate())}/${padValue(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
  console.log(date);
  if (isLoading) return <Loader />;
  return (
    <>
      <Helmet>
        <title>Dashboard | Profile</title>
      </Helmet>
      <section className="p-28  w-full">
        <h1 className="font-medium text-2xl mb-10">{userData?.name}</h1>
        <div className="flex mb-10">
          <div className="w-11/12 ">
            <h1 className="font-medium text-2xl mb-2">Basic information</h1>
            {/* info */}
            <div className="flex justify-between items-start ">
              <div className="">
                <div>
                  <h1 className="font-medium">Name</h1>
                  <p>{userData?.name}</p>
                </div>
                <div>
                  <h1 className="font-medium">Date of birth</h1>
                  <p>{userData?.dateOfBirth ? date : "Not provided"}</p>
                </div>
                <div>
                  <h1 className="font-medium">Accessibility needs</h1>
                  <p>
                    {userData?.accessibilityNeeds
                      ? userData?.accessibilityNeeds
                      : "Not provided"}
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <h1 className="font-medium">Bio</h1>
                  <p>{userData?.bio ? userData?.bio : "Not provided"}</p>
                </div>
                <div>
                  <h1 className="font-medium">Gender</h1>
                  <p> {userData?.gender ? userData?.gender : "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Edit basic info button */}
          <Link to="/profile/update/basic-information" className="w-1/12">
            <button className="text-blue-600 font-bold px-2 ">Edit</button>
          </Link>
        </div>
        <div className="w-full">
          <h1 className="font-medium text-2xl mb-2">Contact</h1>
          <div className="flex">
            {/* info */}
            <div className="flex justify-between items-start w-11/12">
              <div>
                <div>
                  <h1 className="font-medium">Mobile number</h1>
                  <p>Not provided</p>
                </div>
                <div>
                  <h1 className="font-medium">Emergency contact</h1>
                  <p>Not provided</p>
                </div>
              </div>
              <div>
                <div>
                  <h1 className="font-medium">Email</h1>
                  <p>{userData?.email}</p>
                </div>
                <div>
                  <h1 className="font-medium">Address</h1>
                  <p>Not provided</p>
                </div>
              </div>
            </div>
            {/* button */}
            <Link to="/profile/update/contact-information" className="w-1/12">
              <button className="text-blue-600 font-bold px-2 ">Edit</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
