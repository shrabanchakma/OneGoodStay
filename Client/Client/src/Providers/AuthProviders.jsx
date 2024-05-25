import { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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
    console.log("hi");
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
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
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== user) {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [user]);

  // sign out user
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
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
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;

AuthProviders.propTypes = {
  children: PropTypes.node,
};
