const RoomReviewBox = () => {
  // review box
  return (
    <div className="h-full w-80 bg-white rounded-lg border-[1px] border-gray-400 space-y-4">
      <div className="p-3">
        {/* review heading and description */}
        <div>
          <h1 className="font-medium ">8/10 Very good</h1>
          <p className="text-blue-500 ">Read more</p>
        </div>
        <div>
          {/* user name and review date */}
          <h1 className="font-medium text-sm ">Bruno</h1>
          <p className="text-[12px] text-gray-700">January 28, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default RoomReviewBox;
