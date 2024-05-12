import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true,
});

const useAxiosSecure = () => {
   useEffect(() => {
      axiosSecure.interceptors.response.use(
         (res) => {
            return res;
         },
         (error) => {
            console.log(`error tracked in the interceptor`, error.response);

            if (error.response.status === 401 || error.response.error === 403) {
               console.log(`Unauthorized access. Logout user.`);
            }
         }
      );
   }, []);

   return axiosSecure;
};

export default useAxiosSecure;
