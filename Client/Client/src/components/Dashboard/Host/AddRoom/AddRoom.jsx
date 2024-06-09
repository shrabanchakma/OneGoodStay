import { useEffect, useState } from "react";
import AddRoomForm from "./AddRoomForm";
import { topAmenitiesData as amenities } from "../../../Rooms/TopAmenities/TopAmenitiesData";
import useAuth from "../../../../Hooks/useAuth";
import { uploadImage } from "../../../../Api/utils";
import toast from "react-hot-toast";
import { saveRoom } from "../../../../Api/rooms";
const AddRoom = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const image = form.image.files[0];
    if (!image) {
      toast.error("Please Select an Image");
      setLoading(false);
      return;
    }
    try {
      const { display_url } = await uploadImage(image);
      const title = form.title.value;
      const location = e.target.location.value;
      const bestFacility = form["best-facility"].value;
      const price = form.price.value;
      const guest = form.guest.value;
      const bedrooms = form.bedrooms.value;
      const bathrooms = form.bathrooms.value;
      const description = form.description.value;
      const amenities = selectedAmenities;
      const newRoom = {
        host: {
          name: user?.displayName,
          email: user?.email,
        },
        image: display_url,
        location: location,
        title: title,
        category: selectedCategory,
        bestFacility: bestFacility,
        price: parseFloat(price),
        guest: guest,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        description: description,
        amenities: amenities,
        startDate: dates.startDate,
        endDate: dates.endDate,
        isBooked: false,
      };
      // save new room
      await saveRoom(newRoom);
      toast.success("Room added successfully");
      // reset every input value
      form.reset();
      setDates({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      });
      setPreviewImg(null);
      setSelectedAmenities([]);
      setSelectedCategory("");
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDates = (ranges) => {
    // this is where you handle dates
    setDates({
      startDate: ranges.startDate,
      endDate: ranges.endDate,
      key: "selection",
    });
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
    <div className="p-7">
      <AddRoomForm
        handleSubmit={handleSubmit}
        dates={dates}
        handleDates={handleDates}
        amenities={amenities}
        selectedAmenities={selectedAmenities}
        updateSelectedAmenities={updateSelectedAmenities}
        loading={loading}
        previewImg={previewImg}
        setPreviewImg={setPreviewImg}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default AddRoom;
