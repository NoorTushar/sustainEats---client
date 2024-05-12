import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Triangle } from "react-loader-spinner";

const MyAddedFoods = () => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   const searchEmail = user?.email;

   const { data: myAddedFoods = [], isLoading } = useQuery({
      queryFn: () => getAddedFoods(),
      queryKey: ["myAddedFoods", searchEmail],
   });

   const getAddedFoods = async () => {
      const result = await axiosSecure(
         `${import.meta.env.VITE_API_URL}/foods/${searchEmail}`
      );

      return result.data;
   };

   if (isLoading) {
      return (
         <div className="min-h-[calc(100vh-392px)] flex items-center justify-center">
            <Triangle
               visible={true}
               height="80"
               width="80"
               color="#009368"
               ariaLabel="triangle-loading"
               wrapperStyle={{}}
               wrapperClass=""
            />
         </div>
      );
   }

   console.log(myAddedFoods);
   return (
      <div className="mt-[100px]">
         <h3>{myAddedFoods.length}</h3>
      </div>
   );
};

export default MyAddedFoods;
