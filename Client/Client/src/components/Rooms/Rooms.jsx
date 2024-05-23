import { useEffect } from "react";
import { useState } from "react";
import { getRooms } from "../../Api/rooms";
import SingleRoom from "./SingleRoom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const { category } = queryString.parse(location.search);
  useEffect(() => {
    const getAllRooms = async () => {
      const allRooms = await getRooms();
      if (category) {
        const filteredRooms = allRooms.filter(
          (room) => room?.category === category
        );
        console.log(filteredRooms);
        setRooms(filteredRooms);
      } else {
        setRooms(allRooms);
      }
    };
    getAllRooms();
  }, [category]);
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
      {rooms.map((room) => (
        <SingleRoom key={room?._id} room={room} />
      ))}
    </div>
  );
};

export default Rooms;
