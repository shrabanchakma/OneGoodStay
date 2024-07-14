import React from "react";
import { FaRegHeart } from "react-icons/fa";
const BookmarkBtn = () => {
  return (
    <div className="h-8 w-8 grid place-items-center bg-white text-[#e41b43] rounded-full">
      <FaRegHeart size={21} />
    </div>
  );
};

export default BookmarkBtn;
