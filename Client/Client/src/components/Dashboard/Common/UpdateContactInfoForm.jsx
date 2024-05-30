import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { FaPenToSquare } from "react-icons/fa6";
import useUserData from "../../../Hooks/useUserData";
import "./Common.css";
const UpdateContactInfoForm = ({ handleSubmit, handleOnChange, errorMsg }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { userData } = useUserData();
  return (
    <div className="w-[480px] h-full my-32 ">
      <div className="text-gray-700 mb-3">
        <h1 className="text-3xl font-medium">Contact</h1>
        <p className="text-sm ">
          Receive account activity alerts and trip updates by sharing this
          information.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="text-gray-700">
        <div className="mb-2">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Mobile Number
          </label>
          <input
            type="number"
            name="number"
            id="number"
            placeholder="Phone number"
            onChange={handleOnChange}
            defaultValue={userData?.number}
            className="w-full px-3 py-2 border  rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
            data-temp-mail-org="0"
          />
          {errorMsg?.number && (
            <span className="text-rose-700">{errorMsg?.number}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="emergencyContact"
            className="block  text-sm font-medium text-gray-700"
          >
            Emergency contact
          </label>
          <p className="text-sm mb-1">Trusted person in case of an emergency</p>
          <input
            type="text"
            name="emergencyContactName"
            id="emergencyContactName"
            placeholder="Contact name"
            onChange={handleOnChange}
            defaultValue={userData?.emergencyContactName}
            className="w-full mb-2 px-3 py-2 border  rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
            data-temp-mail-org="0"
          />
          <input
            type="number"
            name="emergencyContactNumber"
            id="emergencyContactNumber"
            placeholder="Phone number"
            onChange={handleOnChange}
            defaultValue={userData?.emergencyContactNumber}
            className="w-full mb-2 px-3 py-2 border  rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
            data-temp-mail-org="0"
          />
          {errorMsg?.emergencyContactNumber && (
            <span className="text-rose-700">
              {errorMsg?.emergencyContactNumber}
            </span>
          )}
        </div>
        <div className="">
          <label
            htmlFor="email"
            className="block  text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="flex items-center mb-2">
            {isEditing ? (
              <div className="flex flex-col items-end w-2/3">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={handleOnChange}
                  defaultValue={userData?.email}
                  className="w-full mb-2 p-1 px-2 border  rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
                  data-temp-mail-org="0"
                />
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 px-3 bg-neutral-200 border-[1px] rounded-md"
                >
                  cancel
                </button>
              </div>
            ) : (
              <p>{userData?.email}</p>
            )}

            <span
              data-tooltip-id="tooltip"
              data-tooltip-delay-show={300}
              onClick={() => setIsEditing(true)}
              className="px-2 cursor-pointer font-semibold text-lg leading-tight active:bg-neutral-200"
            >
              <FaPenToSquare />
            </span>
            <Tooltip
              id="tooltip"
              place="right"
              content="Edit"
              variant="light"
              style={{
                backgroundColor: "rgb(229 229 229)",
              }}
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            defaultValue={userData?.address}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border  rounded-md border-gray-700 focus:outline-blue-500  text-gray-900"
            data-temp-mail-org="0"
          />
        </div>
        {/* submit button */}
        <div className="flex justify-center mt-10">
          <button className="text-lg bg-sky-500 hover:bg-sky-600 active:bg-sky-700 p-2 py-3  text-white font-bold rounded-3xl w-1/3">
            save
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateContactInfoForm.propTypes = {};

export default UpdateContactInfoForm;
