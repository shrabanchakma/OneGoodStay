import { useEffect } from "react";
import { useState } from "react";
import { getRooms } from "../../Api/rooms";
import SingleRoom from "./SingleRoom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const getAllRooms = async () => {
      const data = await getRooms();
      setRooms(data);
    };
    getAllRooms();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {rooms.map((room) => (
        <SingleRoom key={room?._id} room={room} />
      ))}
    </div>
  );
};

export default Rooms;
