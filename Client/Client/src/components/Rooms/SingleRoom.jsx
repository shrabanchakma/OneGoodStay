import PropTypes from "prop-types";
const SingleRoom = ({ room }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg group">
      <img
        className="w-full group-hover:scale-125"
        src={room?.image}
        alt="Card Image"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{room?.title}</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          tincidunt arcu vel arcu fermentum, eget accumsan dolor dignissim.
        </p>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button
        </button>
      </div>
    </div>
  );
};

SingleRoom.propTypes = { room: PropTypes.object };

export default SingleRoom;
