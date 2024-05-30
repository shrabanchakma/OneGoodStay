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
export const requestForHost = async (email) => {
  const { data } = await axiosSecure.patch(`/user/role/${email}`);
  return data;
};

// update user role
export const changeUserRole = async (email, role) => {
  const { data } = await axiosSecure.patch(`/user/role/${email}`, { role });
  return data;
};

// update user information
export const updateUserInfo = async (email, updatedUserInfo) => {
  const { data } = await axiosSecure.put(
    `/user/update?email=${email}`,
    updatedUserInfo
  );
  return data;
};

// update contact info
export const updateContactInfo = async (email, contactInfo) => {
  const { data } = await axiosSecure.patch(
    `/user/update?email=${email}`,
    contactInfo
  );
  return data;
};
