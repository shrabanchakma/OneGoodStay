import { useState } from "react";
import { uploadImage } from "../../../../Api/utils";
import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import { topAmenitiesData as amenities } from "../../../Rooms/TopAmenities/TopAmenitiesData";
import { updateARoom } from "../../../../Api/rooms";
import UpdateRoomForm from "./UpdateRoomForm";
import { useLoaderData, useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Loader";
const UpdateRoom = () => {
  const roomData = useLoaderData();
  console.log(roomData);

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedAmenities, setSelectedAmenities] = useState(
    roomData?.amenities
  );
  const [selectedCategory, setSelectedCategory] = useState(roomData?.category);
  const [previewImg, setPreviewImg] = useState(null);
  const [dates, setDates] = useState({
    startDate: new Date(roomData?.startDate),
    endDate: new Date(roomData?.endDate),
    key: "selection",
  });

  // update room
  const handleUpdate = async (formData) => {
    setLoading(true);
    const form = formData.target;
    try {
      let image = form.image.files[0];
      if (image) {
        const { display_url } = await uploadImage(image);
        image = display_url;
      } else {
        image = roomData?.image;
      }

      const title = form.title.value;
      const location = form.location.value;
      const bestFacility = form["best-facility"].value;
      const price = form.price.value;
      const guest = form.guest.value;
      const bedrooms = form.bedrooms.value;
      const bathrooms = form.bathrooms.value;
      const description = form.description.value;
      const amenities = selectedAmenities;
      const updatedRoom = {
        host: {
          name: user?.displayName,
          email: user?.email,
        },
        image: image,
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
      };
      // update room
      const updateInfo = await updateARoom(updatedRoom, roomData?._id);
      console.log(updateInfo);
      toast.success("Room updated successfully");
      // reset every input value
      navigate("../hosted-rooms");
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

  if (loading) return <Loader />;
  return (
    <div className="p-7">
      <UpdateRoomForm
        roomData={roomData}
        handleUpdate={handleUpdate}
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

export default UpdateRoom;
