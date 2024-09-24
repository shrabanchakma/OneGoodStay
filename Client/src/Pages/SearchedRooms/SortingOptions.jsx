import React from "react";
import PropTypes from "prop-types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

const SortingOptions = ({ selectOption, options, selectedOption }) => {
  return (
    <div className="w-1/2  border border-black rounded-xl">
      <Menu>
        <MenuButton
          className={
            "text-gray-700 w-full text-start py-1 px-4 flex items-center justify-between"
          }
        >
          <div>
            <p className="text-[14px] font-semibold text-gray-900">Sort by</p>
            <span>{selectedOption}</span>
          </div>
          <FaChevronDown />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className={
            "bg-white w-[var(--button-width)] [--anchor-gap:4px] border border-gray-500 "
          }
        >
          {options.map((option, idx) => (
            <MenuItem key={idx}>
              <p
                onClick={() => selectOption(option)}
                className="block data-[focus]:bg-blue-500 data-[focus]:text-white w-full px-2 cursor-pointer"
              >
                {option}
              </p>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

SortingOptions.propTypes = {
  selectOption: PropTypes.func,
  selectedOption: PropTypes.string,
  options: PropTypes.array,
};

export default SortingOptions;
