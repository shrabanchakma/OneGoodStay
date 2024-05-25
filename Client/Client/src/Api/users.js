import axiosSecure from ".";

// get all the users
export const getAllUsers = async () => {
  const { data } = await axiosSecure("/users");
  return data;
};
