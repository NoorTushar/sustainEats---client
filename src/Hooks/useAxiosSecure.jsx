import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true,
});

const useAxiosSecure = () => {
   const { logOut } = useAuth();
   const navigate = useNavigate();

   // interceptors
   axiosSecure.interceptors.response.use(
      (res) => {
         return res;
      },
      async (error) => {
         console.log(`Error found in interceptor`, error.response);

         if (error.response.status === 401 || error.response.status === 403) {
            console.log(`Forbidden or Unauthorized. Will logout now.`);

            await logOut();
            navigate("/login");
         }

         // amra ager joto try catch lekhsi.. error catch scope
         // e dekhte chaile ai line ta dite hobe.
         return Promise.reject(error);
      }
   );

   return axiosSecure;
};

export default useAxiosSecure;
