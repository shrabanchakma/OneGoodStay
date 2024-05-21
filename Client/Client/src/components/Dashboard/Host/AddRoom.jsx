import { useState } from "react";
import AddRoomForm from "./AddRoomForm";
import { topAmenitiesData as amenities } from "../../Rooms/TopAmenities/TopAmenitiesData";
import useAuth from "../../../Hooks/useAuth";
import { uploadImage } from "../../../Api/utils";
const AddRoom = () => {
  const { user } = useAuth();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.files[0];
    try {
      const data = await uploadImage(image);
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
    // console.log(image);
    // const title = form.title.value;
    // const location = e.target.location.value;
    // const bestFacility = form["best-facility"].value;
    // const price = form.price.value;
    // const guest = form.guest.value;
    // const bedrooms = form.bedrooms.value;
    // const bathrooms = form.bathrooms.value;
    // const description = form.description.value;
    // const amenities = selectedAmenities;
    // const RoomInfo = {
    //   hostData: {
    //     name: user?.displayName,
    //     email: user?.email,
    //   },
    //   location: location,
    //   title: title,
    //   bestFacility: bestFacility,
    //   price: price,
    //   guest: guest,
    //   bedrooms: bedrooms,
    //   bathrooms: bathrooms,
    //   description: description,
    //   amenities: amenities,
    //   startDate: dates.startDate,
    //   endDate: dates.endDate,
    // };
    // console.table(RoomInfo);
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
