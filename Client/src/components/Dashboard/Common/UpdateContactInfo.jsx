import toast from "react-hot-toast";
import UpdateContactInfoForm from "./UpdateContactInfoForm";
import { updateContactInfo } from "../../../Api/users";
import useUserData from "../../../Hooks/useUserData";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UpdateContactInfo = () => {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    number: userData?.contactInfo?.number || "",
    emergencyContactName: userData?.contactInfo?.emergencyContactName || "",
    emergencyContactNumber: userData?.contactInfo?.emergencyContactNumber || "",
    email: userData?.email || "",
    address: userData?.contactInfo?.address || "",
  });
  const [errorMsg, setErrorMsg] = useState({
    number: "",
    emergencyContactNumber: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setContactInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [name]: value,
    }));
  };

  const validateNumber = (name, number) => {
    const isNumberValid =
      (number.length === 11 && number.startsWith("01")) || number.length === 0;
    console.log(isNumberValid, number.length, number.startsWith("01"));
    setErrorMsg((prevErrorMsg) => ({
      ...prevErrorMsg,
      [name]: isNumberValid ? "" : "Please input valid number",
    }));
    return isNumberValid ? true : false;
  };
  console.log(errorMsg);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate number
    if (
      !validateNumber("number", contactInfo?.number) ||
      !validateNumber(
        "emergencyContactNumber",
        contactInfo?.emergencyContactNumber
      )
    ) {
      return;
    }
    try {
      const contactData = {
        number: contactInfo?.number,
        emergencyContactName: contactInfo?.emergencyContactName,
        emergencyContactNumber: contactInfo?.emergencyContactNumber,
        address: contactInfo?.address,
      };
      console.table(contactData);

      await toast.promise(updateContactInfo(userData?.email, contactData), {
        loading: "Updating...",
        success: "Contact info updated",
        error: "Something went wrong!",
      });
      navigate("/dashboard/profile");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="h-screen flex justify-center">
      <UpdateContactInfoForm
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        contactInfo={contactInfo}
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default UpdateContactInfo;
