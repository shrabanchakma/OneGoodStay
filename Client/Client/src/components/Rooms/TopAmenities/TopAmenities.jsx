import { useEffect, useState } from "react";
import Heading from "../../Shared/Heading";
import { topAmenitiesData as amenities } from "./TopAmenitiesData";
const TopAmenities = ({ roomAmenities }) => {
  const [displayAmenities, setDisplayAmenities] = useState([]);
  useEffect(() => {
    const filtered = amenities.filter((amenity) =>
      roomAmenities?.includes(amenity?.label)
    );
    setDisplayAmenities(filtered);
  }, [roomAmenities]);
  return (
    <div id="Amenities" className="py-10">
      <Heading label="Popular amenities" />
      <div className="flex items-center justify-around w-1/2 ">
        {displayAmenities.map((amenity, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-1">
              {<amenity.icon className="text-2xl " />}
              <p className="font-medium text-xl">{amenity.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAmenities;
