import { createContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebaseconfig";

const AuthContext = createContext({});
const AuthProviders = ({ children }) => {
  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthProviders;
