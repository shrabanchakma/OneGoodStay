import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const RecentViewsCard = ({ room }) => {
  return (
    <Link
      to={`/room-details/${room?.roomId}`}
      className="relative  rounded-lg flex flex-col justify-center w-60  group"
    >
      <div className="absolute bg-black inset-0 bottom-10 rounded-lg -z-10"></div>
      <img
        src={room?.image}
        className="object-cover rounded-t-lg h-4/5 group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
      />
      <div className="h-1/5 flex items-center justify-center bg-white overflow-hidden border rounded-b-xl">
        <p className="text-center font-medium transform transition-transform duration-300 group-hover:scale-105 group-active:scale-100 group-active:duration-150 ease-in-out">
          {room?.title}
        </p>
      </div>
    </Link>
  );
};

export default RecentViewsCard;
RecentViewsCard.propTypes = {
  room: PropTypes.object,
};
