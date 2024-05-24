import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
  const { signOutUser, user } = useAuth();
  return (
    <div className="p-28  w-full">
      <h1 className="font-medium text-2xl mb-10">{user?.displayName}</h1>
      <div className="flex mb-10">
        <div className="w-11/12 ">
          <h1 className="font-medium text-2xl mb-2">Basic information</h1>
          {/* info */}
          <div className="flex justify-between items-start ">
            <div className="">
              <div>
                <h1 className="font-medium">Name</h1>
                <p>{user?.displayName}</p>
              </div>
              <div>
                <h1 className="font-medium">Date of birth</h1>
                <p>Not provided</p>
              </div>
              <div>
                <h1 className="font-medium">Accessibility needs</h1>
                <p>Not provided</p>
              </div>
            </div>
            <div>
              <div>
                <h1 className="font-medium">Bio</h1>
                <p>Not provided</p>
              </div>
              <div>
                <h1 className="font-medium">Gender</h1>
                <p>Not provided</p>
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="w-1/12">
          <button className="text-blue-600 font-bold px-2 ">Edit</button>
        </div>
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
                <p>{user?.email}</p>
              </div>
              <div>
                <h1 className="font-medium">Address</h1>
                <p>Not provided</p>
              </div>
            </div>
          </div>
          {/* button */}
          <div className="w-1/12">
            <button className="text-blue-600 font-bold px-2 ">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
