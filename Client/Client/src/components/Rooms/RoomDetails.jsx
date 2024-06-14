import Container from "../Shared/Container";
import RoomSection from "./RoomSection";
import RoomOverview from "./RoomOverview/RoomOverview";
import TopAmenities from "./TopAmenities/TopAmenities";
import RoomReservation from "./RoomReservation/RoomReservation";
import RoomReview from "./RoomReview/RoomReview";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
const sections = ["Overview", "Amenities", "Reservation", "Review"];
const RoomDetails = () => {
  const room = useLoaderData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <img
        src={room?.image}
        alt=""
        className="w-full w-[10vh h-[50vh] bg-green-500 lg:rounded-lg object-cover"
      />
      {/* sections */}
      <div className="sticky top-0 bg-white md:w-3/4 flex justify-between items-center h-12 lg:px-3 border-b border-gray-400 z-40">
        <div className="flex gap-4">
          {sections.map((section, idx) => (
            <RoomSection key={idx} label={section} roomId={room?._id} />
          ))}
        </div>
        <button className="bg-sky-600 text-white  font-bold w-40 h-[40px] rounded-3xl hover:bg-sky-700 hidden md:block">
          Reserve a Room
        </button>
      </div>

      <RoomOverview room={room} />
      <TopAmenities roomAmenities={room?.amenities} />
      <RoomReservation room={room} />
      <RoomReview />
    </Container>
  );
};

export default RoomDetails;
