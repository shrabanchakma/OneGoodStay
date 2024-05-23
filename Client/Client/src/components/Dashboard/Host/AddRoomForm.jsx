import { DateRange } from "react-date-range";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import "./AddRoom.css";
import Amenity from "./Amenity";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
const AddRoomForm = ({
  handleSubmit,
  amenities,
  selectedAmenities,
  updateSelectedAmenities,
  dates,
  handleDates,
  loading,
  previewImg,
  setPreviewImg,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const amenityListRef = useRef(null);

  const handleClickOutside = (e) => {
    if (
      amenityListRef.current &&
      !amenityListRef.current.contains(e.target) &&
      !e.target.closest(".amenities-button")
    )
      setIsMenuVisible(false);
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else setPreviewImg(null);
  };
  useEffect(() => {
    console.log("from use effect");
    if (isMenuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", () => setIsMenuVisible(false));
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuVisible]);

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Location
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="location"
                id="location"
                type="text"
                placeholder="Location"
                required
              />
            </div>

            <div
              onClick={() => {
                setIsMenuVisible(!isMenuVisible);
              }}
              className={`space-y-1 text-sm relative p-2 px-3 bg-white  w-full  rounded-xl
              border ${
                isMenuVisible ? "border-[#e41b43]" : "border-rose-300"
              } amenities-button
               `}
            >
              <label
                htmlFor="Amenities"
                className=" text-gray-600 font-medium flex items-center justify-between"
              >
                Amenities
                <FaChevronDown />
              </label>
              {/* selected amenities */}

              <div
                ref={amenityListRef}
                className={`${
                  isMenuVisible ? "opacity-100 z-10" : "opacity-0 -z-20"
                } absolute  left-0 top-[34px] bg-white w-full  transition-opacity duration-75 ease-out`}
              >
                {amenities.map((amenity, idx) => (
                  <Amenity
                    key={idx}
                    amenity={amenity}
                    updateSelectedAmenities={updateSelectedAmenities}
                    selectedAmenities={selectedAmenities}
                    isSelected={!!selectedAmenities.includes(amenity?.label)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block text-gray-600">
                Select Availability Range
              </label>
              <DateRange
                onChange={(item) => handleDates(item.selection)}
                rangeColors={["#e41b43"]}
                ranges={[dates]}
                direction="vertical"
                showMonthAndYearPickers={false}
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="best-facility" className="block text-gray-600">
                Best Facility of the room
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="best-facility"
                id="best-facility"
                type="text"
                placeholder="Best facility"
                required
              />
            </div>

            <div className=" p-4 bg-white w-full  m-auto rounded-lg">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="hidden"
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImagePreview}
                    />
                    <div className="flex items-center gap-2">
                      {/* preview of the selected image */}
                      {previewImg && <img src={previewImg} className="w-10" />}
                      <div className="w-26 p-1 px-3 bg-[#e41b43] rounded-md font-medium text-white cursor-pointer hover:bg-[#a4142c] transition-colors ease-in duration-100">
                        Input Image
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md no-arrows"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="guest" className="block text-gray-600">
                  Total guest
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="total_guest"
                  id="guest"
                  type="number"
                  placeholder="Total guest"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="bedrooms" className="block text-gray-600">
                  Bedrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="bedrooms"
                  id="bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="bathrooms" className="block text-gray-600">
                  Bathrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="bathrooms"
                  id="bathrooms"
                  type="number"
                  placeholder="Bathrooms"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
                name="description"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
        >
          {loading ? (
            <TbFidgetSpinner className="m-auto animate-spin" size={24} />
          ) : (
            "Save & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;

AddRoomForm.propTypes = {
  amenities: PropTypes.array,
  handleSubmit: PropTypes.func,
  selectedAmenities: PropTypes.array,
  updateSelectedAmenities: PropTypes.func,
  dates: PropTypes.object,
  handleDates: PropTypes.func,
  loading: PropTypes.bool,
  previewImg: PropTypes.string,
  setPreviewImg: PropTypes.func,
};
