import { useEffect } from "react";
import { useState } from "react";
import { getRooms } from "../../Api/rooms";
import SingleRoom from "./SingleRoom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Loader from "../Shared/Loader";
import emptyImage from "../../assets/empty-image.jpg";
import useAuth from "../../Hooks/useAuth";
const Rooms = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { category } = queryString.parse(location.search);
  const getAllRooms = async () => {
    const allRooms = await getRooms();
    if (category) {
      const filteredRooms = allRooms.filter(
        (room) =>
          room?.category === category &&
          room?.status !== "checkedOut" &&
          room?.status !== "needs_update"
      );
      setRooms(filteredRooms);
    } else {
      const filteredRooms = allRooms.filter(
        (room) =>
          room?.status !== "checkedOut" && room?.status !== "needs_update"
      );
      console.log("length -->", filteredRooms.length);
      setRooms(filteredRooms);
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getAllRooms();
  }, [category]);

  if (loading) return <Loader />;

  return (
    <div>
      {rooms.length > 0 ? (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 cursor-pointer">
          {rooms.map((room) => (
            <SingleRoom key={room?._id} room={room} userEmail={user?.email} />
          ))}
        </div>
      ) : (
        <div className="min-h-[30vh] mb-36">
          <img src={emptyImage} className="w-2/5 mx-auto" />
          <p className="text-3xl text-center font-bold text-blue-800">
            Opps! There is no room available
          </p>
        </div>
      )}
    </div>
  );
};

export default Rooms;
