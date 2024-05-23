import axiosSecure from ".";

// save new rooms in database
export const saveRoom = async (newRoom) => {
  const { data } = await axiosSecure.post("/rooms", newRoom);
  return data;
};

// get all rooms from database
export const getRooms = async () => {
  const { data } = await axiosSecure("/rooms");
  return data;
};
