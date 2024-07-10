import { CloseButton, useClose } from "@headlessui/react";
import PropTypes from "prop-types";

const City = ({ city, icon: Icon, saveSearchData, closeModal, setErrMsg }) => {
  const close = useClose();
  const saveSelectedCity = () => {
    saveSearchData("city", city);
    setErrMsg("");
    closeModal();
    close();
  };
  return (
    <CloseButton
      as="button"
      onMouseDown={saveSelectedCity}
      className="flex items-center  gap-2 h-12 pl-5 w-full hover:bg-blue-500/10 active:bg-blue-500/30"
    >
      <Icon className={"text-xl"} />
      <span className="font-bold">{city}</span>
    </CloseButton>
  );
};

City.propTypes = {
  city: PropTypes.string,
  Icon: PropTypes.node,
};

export default City;
