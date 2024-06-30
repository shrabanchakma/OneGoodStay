import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const useAuth = () => {
  const authData = useContext(AuthContext);
  return authData;
};

export default useAuth;
