import Container from "../Shared/Container";
import hotelImage from "../../assets/hotel-image-demo.jpg";
import RoomSection from "./RoomSection";
import { Button } from "@headlessui/react";
const sections = ["Overview", "Amenities", "Calender", "Review"];
const RoomDetail = () => {
  return (
    <Container>
      {/* todo : dynamically add room infos */}
      <div>
        <img
          src={hotelImage}
          alt=""
          className="w-3/4 mx-auto rounded-lg object-cover"
        />
        <div className="flex justify-evenly items-center">
          {sections.map((section, idx) => (
            <RoomSection key={idx} label={section} />
          ))}
          <Button>Press me</Button>
        </div>
      </div>
    </Container>
  );
};

export default RoomDetail;
