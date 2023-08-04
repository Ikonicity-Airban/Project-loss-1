import { useContext, useDebugValue } from "react";
import { AppContext } from "../context";

const useAuth = () => {
  const {
    state: { tokenUser: auth },
  } = useContext(AppContext);
  useDebugValue(auth, (auth) => (auth?.email ? "Logged In" : "Logged Out"));
  return useContext(AppContext);
};

export default useAuth;
