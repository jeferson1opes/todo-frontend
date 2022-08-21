import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = (user) => {
    authStorage.storeData(user);
    setUser(user);
  };

  const logout = () => {
    authStorage.removeData();
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
