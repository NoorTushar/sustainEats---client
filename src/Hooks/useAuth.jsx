import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAuth = () => {
   const allValues = useContext(AuthContext);
   return allValues;
};

export default useAuth;
