import toast from "react-hot-toast";
import UpdateContactInfoForm from "./UpdateContactInfoForm";
import { updateContactInfo } from "../../../Api/users";
import useUserData from "../../../Hooks/useUserData";
import { useState } from "react";

const UpdateContactInfo = () => {
  const { userData } = useUserData();
  const [contactInfo, setContactInfo] = useState({
    number: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    email: "",
    address: "",
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
    const isNumberValid = number.length === 11 && number.startsWith("01");
    console.log(isNumberValid, number.length, number.startsWith("01"));
    setErrorMsg((prevErrorMsg) => ({
      ...prevErrorMsg,
      [name]: isNumberValid ? "" : "Please input valid number",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateNumber("number", contactInfo?.number);
    console.log("hi");
    validateNumber(
      "emergencyContactNumber",
      contactInfo?.emergencyContactNumber
    );
    if (errorMsg?.number || errorMsg?.emergencyNumber) return;
    const contactData = {
      number: parseInt(contactInfo?.number),
      emergencyContactName: contactInfo?.emergencyContactName,
      emergencyContactNumber: parseInt(contactInfo?.emergencyContactNumber),
      address: contactInfo?.address,
    };
    console.table(contactData);
    // try {
    //   await toast.promise(
    //     updateContactInfo(userData?.email, contactInfo),
    //     {
    //       loading: "Updating...",
    //       success: "Contact info updated",
    //       error: "Something went wrong!",
    //     },
    //     {
    //       style: {
    //         height: "80px",
    //         minWidth: "300px",
    //         marginTop: "100px",
    //       },
    //     }
    //   );
    // } catch (error) {
    //   console.error(error.message);
    // }
  };
  return (
    <div className="h-screen flex justify-center">
      <UpdateContactInfoForm
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default UpdateContactInfo;
