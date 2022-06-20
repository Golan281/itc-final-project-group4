import { useContext, useDebugValue } from "react";
import userContext from "../components/Context/userContext";

const useAuth = () => {
  const { currentUser } = useContext(userContext);
  useDebugValue(currentUser, (currentUser) =>
    currentUser?.user ? "Logged In" : "Logged Out"
  );
  return useContext(userContext);
};

export default useAuth;
