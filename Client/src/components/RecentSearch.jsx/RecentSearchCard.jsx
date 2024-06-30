import { FaBuilding } from "react-icons/fa";

const RecentSearchCard = () => {
  return (
    <div className="min-h-28 border-[.5px] border-gray-400 flex items-center  rounded-xl ">
      <FaBuilding className="mx-5" />
      <div className="text-start">
        <h1 className="font-bold">Stays in china</h1>
        <p>Fri, 17 may - Say, 18 May</p>
        <p>2 guest - 1 room </p>
      </div>
    </div>
  );
};

export default RecentSearchCard;
