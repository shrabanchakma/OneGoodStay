import "./UpdateProfile.css";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import PropTypes from "prop-types";
import { useState } from "react";
const genders = ["Male", "Female", "Prefer not to tell"];
const accessibilityOptions = [
  "Not provided",
  "NO, I don't have accessibility needs",
  "Yes I have accessibility needs",
  "Rather not say",
];
const UpdateProfileForm = ({
  handleSubmit,
  errorMsg,
  selectedGender,
  setSelectedGender,
}) => {
  const [hoveredGender, setHoveredGender] = useState("");
  return (
    <div className="w-[480px] h-full my-32 ">
      <div className="text-gray-700 mb-3">
        <h1 className="text-3xl font-medium">Basic Information</h1>
        <p className="text-sm ">
          Make sure this information matches your travel ID, like your passport
          or licence.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-5">
          <h1 className="font-semibold">Full name</h1>
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              First
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              className="w-full px-3 py-2 border  rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
              data-temp-mail-org="0"
            />
          </div>
          <div>
            <label
              htmlFor="middleName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Middle
            </label>
            <input
              type="text"
              name="middleName"
              id="middleName"
              placeholder="Middle name"
              className="w-full px-3 py-2 border rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
              data-temp-mail-org="0"
            />
          </div>
          <div>
            <label
              htmlFor="middleName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Last
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              className="w-full px-3 py-2 border rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
              data-temp-mail-org="0"
            />
          </div>
        </div>
        <div className="w-full mb-5">
          <label
            htmlFor="middleName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            About you
          </label>
          <textarea
            placeholder=" Help future host get to know you better. You can share your travel style, hobbies, interests, and more"
            id="bio"
            name="bio"
            className="min-h-32 w-full border border-gray-700 rounded-md p-2 focus:outline-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="middleName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Date of birth
          </label>
          <div className="flex items-center justify-center gap-5">
            <div>
              <label
                htmlFor="middleName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Month
              </label>
              <input
                type="number"
                name="birthMonth"
                id="month"
                placeholder="MM"
                className="w-full px-3 py-2 border rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label
                htmlFor="birthDay"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Day
              </label>
              <input
                type="number"
                name="birthDay"
                id="day"
                placeholder="DD"
                className="w-full px-3 py-2 border rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label
                htmlFor="birthYear"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Year
              </label>
              <input
                type="number"
                name="birthYear"
                id="year"
                placeholder="YYYY"
                className="w-full px-3 py-2 border rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
          </div>
          {/* date error message */}
          {errorMsg && <p className="text-rose-700">{errorMsg}</p>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="birthYear"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <ol className="">
            {genders.map((gender) => (
              <li
                key={gender}
                className={
                  "flex items-center gap-2 cursor-pointer text-gray-700"
                }
                onMouseEnter={() => setHoveredGender(gender)}
                onMouseLeave={() => setHoveredGender("")}
                onClick={() => setSelectedGender(gender)}
              >
                {hoveredGender === gender || gender === selectedGender ? (
                  <RiCheckboxBlankCircleLine
                    className="bg-blue-500 rounded-full text-white  "
                    size={20}
                  />
                ) : (
                  <RiCheckboxBlankCircleLine
                    className="text-blue-500"
                    size={20}
                  />
                )}
                {gender}
              </li>
            ))}
          </ol>
        </div>
        <div className="w-full mb-5">
          <div
            htmlFor="birthYear"
            className="block mb-2 text-sm font-medium text-gray-700 space-y-1"
          >
            <h1 className="block">Accessibility needs</h1>
            <span>
              Help us build features that make travel accessible for all by
              sharing this information.
            </span>
          </div>
          <select
            defaultValue={"Not Provided"}
            className="w-full h-10 rounded-md border border-gray-700 "
            name="accessibilityNeeds"
          >
            {accessibilityOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        {/* submit button */}
        <div className="flex justify-center mt-10">
          <button className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 p-2 py-3  text-white font-bold rounded-3xl w-1/3">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateProfileForm.propTypes = {};

export default UpdateProfileForm;
