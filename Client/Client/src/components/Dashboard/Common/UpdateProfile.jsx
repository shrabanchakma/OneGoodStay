import { useState } from "react";
import UpdateProfileForm from "./UpdateProfileForm";
import { Helmet } from "react-helmet-async";

const UpdateProfile = () => {
  const [errorMsg, setErrorMsg] = useState("");

  // error state, date, run validate date function, return "" if no error or return "error" if error
  const validateBirthInfo = (day, month, year) => {
    // year cannot be this year or more and he has to be at least 18
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
      console.log("from second");
      return false;
    }
    if (age < 18) {
      setErrorMsg("Please input valid date");
      console.log("from third");
      return false;
    }
    console.log("here");
    setErrorMsg("");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const birthDay = parseInt(form.birthDay.value);
    const birthMonth = parseInt(form.birthMonth.value);
    const birthYear = parseInt(form.birthYear.value);
    const result = validateBirthInfo(birthDay, birthMonth, birthYear);
    if (!result) return;

    const firstName = form.firstName.value;
    const middleName = form.middleName.value;
    const lastName = form.lastName.value;
    const fullName = middleName
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;
    const userBio = form.bio.value;
  };
  return (
    <>
      <Helmet>
        <title>Account personal information</title>
      </Helmet>
      <section className="min-h-screen flex justify-center">
        <UpdateProfileForm handleSubmit={handleSubmit} errorMsg={errorMsg} />
      </section>
    </>
  );
};

UpdateProfile.propTypes = {};

export default UpdateProfile;
