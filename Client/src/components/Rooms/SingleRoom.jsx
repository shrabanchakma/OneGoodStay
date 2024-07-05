import PropTypes from "prop-types";
import DefaultButton from "../Shared/DefaultButton";
import { Link } from "react-router-dom";
import { saveVisitedRooms } from "../../Api/rooms";
const SingleRoom = ({ room, userEmail }) => {
  const addVisitedRoom = async () => {
    try {
      const data = await saveVisitedRooms(userEmail, room?._id);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Link
      to={`room-details/${room?._id}`}
      onClick={addVisitedRoom}
      className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col group  hover:shadow-[#e41b43] transition-all duration-300 ease-in-out active:bg-neutral-200 active:shadow-[#e41b43] active:shadow-2xl"
    >
      <div className="overflow-hidden">
        <img
          className="w-full h-60 transition-all duration-150 ease-in-out transform group-hover:scale-125"
          src={room?.image}
          alt="Card Image"
        />
      </div>
      <div className="px-6 py-4 flex-1">
        <div className="font-medium text-lg">{room?.title}</div>
        <p className="font-thin text-sm mb-2">{room?.location}</p>
        <p className="text-gray-700 text-base">
          {room?.description.slice(0, 150)}{" "}
          <span className="text-blue-500 font-bold cursor-pointer hover:underline">
            read more
          </span>
        </p>
      </div>
      <div className="px-6 flex items-center space-x-3  font-medium text-sm text-neutral-400">
        <p className="">Guest: {room?.guest}</p>
        <p className="">BedRooms: {room?.bedrooms}</p>
        <p className="">BathRooms: {room?.bathrooms}</p>
      </div>
      <div className="px-6 py-4 flex items-center justify-between">
        <p className="font-medium text-xl">USD {room?.price}</p>

        <div className="w-1/3">
          <DefaultButton label="read more" />
        </div>
      </div>
    </Link>
  );
};

SingleRoom.propTypes = { room: PropTypes.object };

export default SingleRoom;
