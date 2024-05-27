import axiosSecure from ".";

// get all the users
export const getAllUsers = async () => {
  const { data } = await axiosSecure("/users");
  return data;
};

// get the user from database
export const getUser = async (email) => {
  const { data } = await axiosSecure(`/user?email=${email}`);
  return data;
};

// request to become host
// update user role
export const requestForHost = async (email) => {
  const { data } = await axiosSecure.patch(`/user/role/${email}`);
  return data;
};
