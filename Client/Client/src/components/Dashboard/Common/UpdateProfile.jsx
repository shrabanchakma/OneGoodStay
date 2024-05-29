import React from "react";
import PropTypes from "prop-types";
import UpdateProfileForm from "./UpdateProfileForm";
import { Helmet } from "react-helmet-async";

const updateProfile = (props) => {
  return (
    <>
      <Helmet>
        <title>Account personal information</title>
      </Helmet>
      <section className="min-h-screen flex justify-center">
        <UpdateProfileForm />
      </section>
    </>
  );
};

updateProfile.propTypes = {};

export default updateProfile;
