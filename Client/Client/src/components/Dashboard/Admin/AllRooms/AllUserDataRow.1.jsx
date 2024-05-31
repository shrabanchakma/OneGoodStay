import { Tooltip } from "react-tooltip";

export const AllUserDataRow = ({ user, handleConfirmButton, setIsOpen }) => {
  const handleOpenProfile = () => {
    handleConfirmButton(user);
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap ">{"verified"}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white w-28 text-sm ">
        <p
          onClick={() => handleOpenProfile}
          data-tooltip-id="tooltip"
          data-tooltip-delay-show={300}
          className="text-gray-900 whitespace-no-wrap cursor-pointer hover:font-semibold"
        >
          {user?.role}
        </p>
        <Tooltip
          id="tooltip"
          place="bottom"
          content="Open profile info"
          variant="light"
          style={{
            backgroundColor: "rgb(229 229 229)",
          }}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
        <div className="w-20 p-1 px-3  bg-[#ffa726] text-white rounded-xl font-medium  cursor-pointer hover:bg-[#de9120] active:bg-[#be7b19]  text-center">
          Delete
        </div>
      </td>
    </tr>
  );
};
