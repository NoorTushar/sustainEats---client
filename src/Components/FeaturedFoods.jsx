import FoodCard from "./FoodCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const FeaturedFoods = () => {
   const axiosSecure = useAxiosSecure();

   // get request using tanstack query
   const { data: foods = [], isLoading } = useQuery({
      queryFn: () => getFeaturedFoods(),
      queryKey: ["foods"],
   });

   const getFeaturedFoods = async () => {
      try {
         const result = await axiosSecure("/featured-foods");
         // setFoods(result.data);
         return result.data;
      } catch (error) {
         console.log(error);
      }
   };

   if (isLoading) {
      return (
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-4">
               <div className="skeleton h-32 w-full"></div>
               <div className="skeleton h-4 w-28"></div>
               <div className="skeleton h-4 w-full"></div>
               <div className="skeleton h-4 w-full"></div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="skeleton h-32 w-full"></div>
               <div className="skeleton h-4 w-28"></div>
               <div className="skeleton h-4 w-full"></div>
               <div className="skeleton h-4 w-full"></div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="skeleton h-32 w-full"></div>
               <div className="skeleton h-4 w-28"></div>
               <div className="skeleton h-4 w-full"></div>
               <div className="skeleton h-4 w-full"></div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="skeleton h-32 w-full"></div>
               <div className="skeleton h-4 w-28"></div>
               <div className="skeleton h-4 w-full"></div>
               <div className="skeleton h-4 w-full"></div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="skeleton h-32 w-full"></div>
               <div className="skeleton h-4 w-28"></div>
               <div className="skeleton h-4 w-full"></div>
               <div className="skeleton h-4 w-full"></div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="skeleton h-32 w-full"></div>
               <div className="skeleton h-4 w-28"></div>
               <div className="skeleton h-4 w-full"></div>
               <div className="skeleton h-4 w-full"></div>
            </div>
         </div>
      );
   }

   console.log("foods", foods);
   return (
      <>
         <h3>Featured Foods: {foods?.length}</h3>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods?.map((food) => (
               <FoodCard key={food._id} food={food}></FoodCard>
            ))}
         </div>
      </>
   );
};

export default FeaturedFoods;
