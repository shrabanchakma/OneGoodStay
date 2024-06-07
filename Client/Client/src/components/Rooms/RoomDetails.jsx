import Container from "../Shared/Container";
import RoomSection from "./RoomSection";
import RoomOverview from "./RoomOverview/RoomOverview";
import TopAmenities from "./TopAmenities/TopAmenities";
import RoomReservation from "./RoomReservation/RoomReservation";
import RoomReview from "./RoomReview/RoomReview";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomData } from "../../Api/rooms";
const sections = ["Overview", "Amenities", "Reservation", "Review"];
const RoomDetails = () => {
  const room = useLoaderData();
  return (
    <Container>
      <img
        src={room?.image}
        alt=""
        className="w-full h-[50vh] bg-green-500 rounded-lg object-cover"
      />
      {/* sections */}
      <div className="sticky top-0 bg-white w-3/4 flex justify-between items-center h-12 px-3 border-b border-gray-400">
        <div className="flex gap-4">
          {sections.map((section, idx) => (
            <RoomSection key={idx} label={section} />
          ))}
        </div>
        <button className="bg-sky-600 text-white  font-bold w-40 h-[40px] rounded-3xl hover:bg-sky-700">
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
