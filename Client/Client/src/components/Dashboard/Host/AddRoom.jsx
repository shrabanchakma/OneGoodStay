import { useState } from "react";
import AddRoomForm from "./AddRoomForm";
import { topAmenitiesData as amenities } from "../../Rooms/TopAmenities/TopAmenitiesData";
import useAuth from "../../../Hooks/useAuth";
const AddRoom = () => {
  const { user } = useAuth();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSubmit = () => {
    console.log("this is submit button");
    const RoomInfo = {
      hostData: {
        name: user?.displayName,
        email: user?.email,
      },
      startDate: dates.startDate,
      endDate: dates.endDate,
    };
  };
  const handleDates = (ranges) => {
    // this is where you handle dates
    setDates({
      startDate: ranges.startDate,
      endDate: ranges.endDate,
      key: "selection",
    });
  };
  const handleImageChange = () => {
    // to handle image change
    console.log("to handle image change");
  };
  // update selected amenities
  const updateSelectedAmenities = (amenity) => {
    let filteredAmenities = [];
    if (selectedAmenities.includes(amenity)) {
      filteredAmenities = selectedAmenities.filter(
        (amenityItem) => amenityItem !== amenity
      );
    } else {
      filteredAmenities = [...selectedAmenities, amenity];
    }
    setSelectedAmenities(filteredAmenities);
  };
  return (
    <div>
      <AddRoomForm
        handleSubmit={handleSubmit}
        dates={dates}
        handleDates={handleDates}
        handleImageChange={handleImageChange}
        amenities={amenities}
        selectedAmenities={selectedAmenities}
        updateSelectedAmenities={updateSelectedAmenities}
      />
    </div>
  );
};

export default AddRoom;
