import Container from "../Shared/Container";
import hotelImage from "../../assets/hotel-image-demo.jpg";
import RoomSection from "./RoomSection";
import RoomOverview from "./RoomOverview";
import TopAmenities from "./TopAmenities";
const sections = ["Overview", "Amenities", "Calender", "Review"];
const RoomDetails = () => {
  return (
    <Container>
      {/* todo : dynamically add room infos */}
      {/* hotel image */}
      <div>
        <img
          src={hotelImage}
          alt=""
          className="w-full h-[50vh] bg-green-500 rounded-lg object-cover"
        />
        {/* sections */}
        <div className="w-3/4 flex justify-between items-center h-12 px-3 border-b border-gray-400">
          <div className="flex gap-4">
            {sections.map((section, idx) => (
              <RoomSection key={idx} label={section} />
            ))}
          </div>
          <button className="bg-sky-600 text-white  font-bold w-40 h-[40px] rounded-3xl hover:bg-sky-700">
            Reserve a Room
          </button>
        </div>
      </div>
      <RoomOverview />
      <TopAmenities />
    </Container>
  );
};

export default RoomDetails;
