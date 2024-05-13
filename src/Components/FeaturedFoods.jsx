import FoodCard from "./FoodCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Title from "./Title/Title";

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
         {/* Title */}
         <Title supTitle="Our Top Availabe" title="Featured Foods"></Title>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods?.map((food) => (
               <FoodCard key={food._id} food={food}></FoodCard>
            ))}
         </div>
         <div className="text-center my-6">
            <Link
               to={`/available-foods`}
               className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack inline-block border border-ourOrange"
            >
               <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full "></span>
               <span className="relative">All Available Foods</span>
            </Link>
         </div>
      </>
   );
};

export default FeaturedFoods;
