const Amenity = ({ amenity, handleAmenitySelect, handleAmenityRemove }) => {
  return (
    <div>
      <h1>{amenity?.label}</h1>
    </div>
  );
};

export default Amenity;
