import axiosSecure from ".";

// create jwt token
export const getToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  console.log("token received --->", data);
  return data;
};

// create jwt token
export const removeToken = async () => {
  const { data } = await axiosSecure.get("/logout");
  console.log("token removed --->", data);
  return data;
};
