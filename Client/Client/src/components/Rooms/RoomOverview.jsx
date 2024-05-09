import { FaStar } from "react-icons/fa";
const RoomOverview = () => {
  return (
    <div className="space-y-2">
      {/* todo: make it dynamic */}
      <h1 className="text-2xl font-medium">Wingate by Wyndham Kamloops</h1>
      <div className="flex gap-4 mb-2">
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      {/* special amenity */}
      <p>Aberdeen hotel with indoor pool and 24-hour fitness</p>
      {/* average rating */}
      <div className="flex items-center gap-4">
        <div className="text-white h-10 w-10 font-bold flex items-center justify-center bg-green-500">
          8.8
        </div>
        <p className=" font-bold text-center text-sky-600 border-b border-sky-600 hover:cursor-pointer">
          {"See all 1,006 reviews >"}
        </p>
      </div>
    </div>
  );
};

export default RoomOverview;
