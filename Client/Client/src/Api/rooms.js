import axiosSecure from ".";

export const saveRoom = async (newRoom) => {
  const { data } = await axiosSecure.post("/rooms", newRoom);
  return data;
};
