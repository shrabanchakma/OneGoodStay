import emptyImage from "../../../../assets/empty-image.jpg";
const EmptyRooms = () => {
  return (
    <div className="w-full min-h-[600px] flex flex-col items-center justify-center">
      <img src={emptyImage} alt="" className="w-2/5 mx-auto" />
      <p className="text-3xl text-center font-bold text-blue-800">
        Opps! There are no rooms
      </p>
    </div>
  );
};

export default EmptyRooms;
