import { useState } from "react";
import AddRoomForm from "./AddRoomForm";
import { topAmenitiesData as amenities } from "../../Rooms/TopAmenities/TopAmenitiesData";
const AddRoom = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selected",
  });
  const handleSubmit = () => {
    console.log("this is submit button");
  };
  const handleDates = () => {
    // this is where you handle dates
  };
  const handleImageChange = () => {
    // to handle image change
    console.log("to handle image change");
  };
  const handleAmenitySelect = (options) => {
    console.log("this is amenity select");
  };
  const handleAmenityRemove = (options) => {
    console.log("this is amenity remove");
  };
  // update selected amenities
  const updateSelectedAmenities = (amenity, setIsSelected) => {
    let filteredAmenities = [];
    if (selectedAmenities.includes(amenity)) {
      filteredAmenities = selectedAmenities.filter(
        (amenityItem) => amenityItem !== amenity
      );
    } else {
      filteredAmenities = [...selectedAmenities, amenity];
    }
    console.log(filteredAmenities);
    setSelectedAmenities(filteredAmenities);
  };
  return (
    <div>
      <AddRoomForm
        handleSubmit={handleSubmit}
        handleDates={handleDates}
        handleImageChange={handleImageChange}
        amenities={amenities}
        handleAmenitySelect={handleAmenitySelect}
        handleAmenityRemove={handleAmenityRemove}
        selectedAmenities={selectedAmenities}
        updateSelectedAmenities={updateSelectedAmenities}
      />
    </div>
  );
};

export default AddRoom;
