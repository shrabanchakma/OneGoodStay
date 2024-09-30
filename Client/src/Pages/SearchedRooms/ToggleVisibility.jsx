import PropTypes from "prop-types";
import SearchBar from "../../components/SearchBar/SearchBar";
import { IoSearch } from "react-icons/io5";
const ToggleVisibility = ({ toggleIsHiddenVisibility, isHidden }) => {
  return (
    <>
      <button
        onClick={toggleIsHiddenVisibility}
        className={`w-[20rem] mx-auto flex justify-center items-center gap-2  bg-white text-[#1668E3] font-bold  h-10 rounded-3xl border-[1px] border-gray-400 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43]
      } ${!isHidden && "hidden"} md:hidden`}
      >
        <IoSearch size={20} />
        Search
      </button>
      <div className={`${isHidden ? "hidden md:block" : ""}`}>
        <SearchBar />
        <button
          onClick={toggleIsHiddenVisibility}
          className={`w-[20rem] mx-auto flex md:hidden justify-center items-center gap-2  bg-white text-[#1668E3] font-bold  h-10 rounded-3xl  data-[active]:outline data-[active]:outline-[#e41b43]
      }`}
        >
          Close
        </button>
      </div>
    </>
  );
};

ToggleVisibility.propTypes = {
  toggleIsHiddenVisibility: PropTypes.func,
  isHidden: PropTypes.bool,
};

export default ToggleVisibility;
