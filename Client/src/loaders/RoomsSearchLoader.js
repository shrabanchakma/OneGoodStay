import { getSearchedRooms } from "../Api/rooms";

export const fetchFilteredRooms = async ({ request }) => {
  const location = new URL(request.url);
  try {
    const data = await getSearchedRooms(location);
    return data;
  } catch (error) {
    console.error(error);
  }
};
