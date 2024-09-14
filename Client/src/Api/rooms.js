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

// book a room
export const bookARoom = async (id, roomDetails) => {
  const { data } = await axiosSecure.put(`/book/room/${id}`, roomDetails);
  return data;
};

// get all booked rooms
export const getBookedRooms = async (email) => {
  const { data } = await axiosSecure.get(`/booked-rooms/${email}`);
  return data;
};

// save user reviews
export const saveRatingData = async (ratingData) => {
  const { data } = await axiosSecure.post(`/rooms/ratings`, ratingData);
  return data;
};

// get reviews (lazy loading)
export const getRoomReviews = async (id, page, limit) => {
  const { data } = await axiosSecure.get(
    `/rooms/reviews/${id}?page=${page}&&limit=${limit}`,
    {
      page,
      limit,
    }
  );
  return data;
};

// get reviews
export const getAverageRatings = async (id) => {
  const { data } = await axiosSecure(`/rooms/ratings/${id}`);
  return data;
};

// get all review data based on category
export const getCategoryReviews = async (id) => {
  const { data } = await axiosSecure.get(`/rooms/category-reviews/${id}`);
  return data;
};

// check if user can review the room
export const isReviewAllowed = async (email, id) => {
  const { data } = await axiosSecure.get(`/can-review/${id}?email=${email}`);
  return data;
};

// add visited rooms
export const saveVisitedRooms = async (userEmail, roomId) => {
  const { data } = await axiosSecure.post(`/visited-rooms`, {
    roomId,
    userEmail,
  });
  return data;
};

// get visitedRooms
export const getVisitedRooms = async (email) => {
  const { data } = await axiosSecure.get(`/visited-rooms?email=${email}`);
  return data;
};

// search rooms
export const getSearchedRooms = async (location) => {
  const city = location.searchParams.get("city");
  const startDate = location.searchParams.get("startDate");
  const endDate = location.searchParams.get("endDate");
  const rooms = location.searchParams.get("rooms");
  const guests = location.searchParams.get("guests");
  const { data } = await axiosSecure.get(
    `/room-search?city=${city}&startDate=${startDate}&endDate=${endDate}&rooms=${rooms}&guests=${guests}`
  );
  return data;
};
