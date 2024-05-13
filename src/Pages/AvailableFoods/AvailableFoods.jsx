import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FoodCard from "../../Components/FoodCard";
import Title from "../../Components/Title/Title";

const AvailableFoods = () => {
   // using tanstack useQuery to get foods from database
   const { data: foods = [], isLoading } = useQuery({
      queryFn: async () => {
         const result = await axios(`${import.meta.env.VITE_API_URL}/foods`);
         console.log(result.data);
         //  must return the result
         return result.data;
      },
      queryKey: ["foods"],
   });

   // while loading the data what should the UI do?
   if (isLoading) {
      return (
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[68px] max-w-1170px w-[90%] md:w-[82%] mx-auto">
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

   return (
      <div className="mt-[68px] max-w-1170px w-[90%] md:w-[82%] mx-auto">
         {/* title */}
         <Title supTitle="By Our Heroes" title="Available Foods"></Title>

         {/******** Foods Gallery ********/}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
               <FoodCard key={food._id} food={food}></FoodCard>
            ))}
         </div>
      </div>
   );
};

export default AvailableFoods;
