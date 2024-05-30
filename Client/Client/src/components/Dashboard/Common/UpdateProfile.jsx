import { useEffect, useState } from "react";
import UpdateProfileForm from "./UpdateProfileForm";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import useUserData from "../../../Hooks/useUserData";
import toast from "react-hot-toast";
import { updateUserInfo } from "../../../Api/users";

const UpdateProfile = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const { userData } = useUserData();
  const [selectedGender, setSelectedGender] = useState(userData?.gender);
  const validateBirthInfo = (day, month, year) => {
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      setErrorMsg("Please input valid date");
      console.log("from first");
      return false;
    }

    // get dates
    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDay();
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    // get age
    let age = currentYear - birthYear;
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }

    // check validity
    if (birthYear !== year || birthMonth !== month - 1 || birthDay !== day) {
      setErrorMsg("Please input valid date");
      return false;
    }
    if (age < 18) {
      setErrorMsg("Please input valid date");
      return false;
    }

    setErrorMsg("");
    return birthDate;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const birthDay = parseInt(form.birthDay.value);
    const birthMonth = parseInt(form.birthMonth.value);
    const birthYear = parseInt(form.birthYear.value);
    let birthDate = "";
    if (birthDay || birthMonth || birthDay) {
      birthDate = validateBirthInfo(birthDay, birthMonth, birthYear);
      if (!birthDate) return;
    } else {
      setErrorMsg("");
    }

    const firstName = form.firstName.value;
    const middleName = form.middleName.value;
    const lastName = form.lastName.value;
    const fullName = middleName
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;
    const userBio = form.bio.value;
    const accessibilityNeeds = form.accessibilityNeeds.value;
    const updatedUser = {
      name: fullName,
      email: userData?.email,
      timestamp: userData?.timestamp,
      role: userData?.role,
      bio: userBio,
      birthDate: birthDate,
      gender: selectedGender,
      accessibilityNeeds: accessibilityNeeds,
    };

    try {
      await toast.promise(updateUserInfo(userData?.email, updatedUser), {
        loading: "Updating",
        success: "User info updated",
        error: "Something went wrong",
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Account personal information</title>
      </Helmet>
      <section className="min-h-screen flex justify-center">
        <UpdateProfileForm
          handleSubmit={handleSubmit}
          errorMsg={errorMsg}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          userData={userData}
        />
      </section>
    </>
  );
};

UpdateProfile.propTypes = {};

export default UpdateProfile;
