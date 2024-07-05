import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const RecentViewsCard = ({ room }) => {
  return (
    <Link
      to={`/room-details/${room?.roomId}`}
      className="border rounded-xl flex flex-col justify-center w-60 bg-black group"
    >
      <img
        src={room?.image}
        className="object-cover rounded-t-xl flex-1 group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
      />
      <div className="min-h-16 flex items-center justify-center bg-white overflow-hidden">
        <p className="text-center font-medium transform transition-transform duration-300 group-hover:scale-105 ease-in-out">
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
