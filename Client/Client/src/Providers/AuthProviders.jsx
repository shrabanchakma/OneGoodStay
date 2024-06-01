import { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import auth from "../firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import PropTypes from "prop-types";
export const AuthContext = createContext({});
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("email");
const AuthProviders = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // set user name
  const updateUserProfile = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };
  // // set new email
  // const updateUserEmail = (newEmail) => {
  //   setLoading(true);
  //   return updateEmail(auth.currentUser, newEmail);
  // };
  // // verify new email
  // const verifyEmail = () => {
  //   setLoading(true);
  //   return sendEmailVerification(auth.currentUser);
  // };

  // DELETE a user
  const deleteAUser = () => {
    setLoading(true);
    return deleteUser(auth.currentUser);
  };

  // sign in
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sing in with google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // sing in with google
  const facebookSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  // get the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("user->", currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // sign out user
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // delete a user
  const deleteCurrentUser = () => {
    return deleteUser(auth.currentUser);
  };
  const authData = {
    createUser,
    signInUser,
    googleSignIn,
    signOutUser,
    loading,
    user,
    updateUserProfile,
    facebookSignIn,
    updateProfile,
    deleteCurrentUser,
    deleteAUser,
    // updateUserEmail,
    // verifyEmail,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;

AuthProviders.propTypes = {
  children: PropTypes.node,
};
