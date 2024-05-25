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

// get a single room
export const getRoomData = async (RoomId) => {
  const { data } = await axiosSecure(`/rooms/${RoomId}`);
  return data;
};

// get all hosted rooms of host
export const getHostedRooms = async (email) => {
  const { data } = await axiosSecure(`/rooms?email=${email}`);
  return data;
};

// delete a room
export const deleteRoom = async (id) => {
  const { data } = await axiosSecure.delete(`/room/delete?roomId=${id}`);
  return data;
};

// update room

export const updateARoom = async (updatedRoom, id) => {
  const { data } = await axiosSecure.put(
    `/room/update?roomId=${id}`,
    updatedRoom
  );
  return data;
};
