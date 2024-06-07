import { useState } from "react";
import RoomReviewModal from "./RoomReviewModal";
const RoomReviewBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  // review box
  return (
    <div className="h-[30vh] w-[330px] sm:w-[350px] md:w-[400px] bg-white rounded-lg border-[1px] border-gray-400 space-y-4 ">
      <div className="p-8">
        {/* review heading and description */}
        <div>
          <h1 className="font-medium ">8/10 Very good</h1>
          <p className="text-sm lg:text-[12px]">
            The bed was not made, no sheets, coffee maker was half full and not
            clean at all. You cannot get ahold of anyone after 11 pm
          </p>
          <p
            onClick={() => {
              setIsOpen(true);
            }}
            className="text-blue-500 hover:cursor-pointer"
          >
            Read more
          </p>
        </div>
        <div>
          {/* user name and review date */}
          <h1 className="font-medium text-sm ">Bruno</h1>
          <p className="text-[12px] text-gray-700">January 28, 2024</p>
        </div>
      </div>
      {/* modal */}
      <RoomReviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default RoomReviewBox;
