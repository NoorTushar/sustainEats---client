import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FoodCard from "../../Components/FoodCard";
import Title from "../../Components/Title/Title";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AvailableFoods = () => {
   const [searchText, setSearchText] = useState("");
   const [search, setSearch] = useState("");
   const [sort, setSort] = useState("");
   // using tanstack useQuery to get foods from database
   const { data: foods = [], isLoading } = useQuery({
      queryFn: async () => {
         const result = await axios(
            `${
               import.meta.env.VITE_API_URL
            }/foods?search=${search}&sort=${sort}`
         );
         console.log(result.data);
         //  must return the result
         return result.data;
      },
      queryKey: ["foods", search, sort],
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

   const handleSearch = (e) => {
      e.preventDefault();

      setSearch(searchText);
   };

   const handleReset = (e) => {
      e.preventDefault();
      setSearchText("");
      setSearch("");
      setSort("");
   };

   return (
      <div className="mt-[68px] max-w-1170px w-[90%] md:w-[82%] mx-auto">
         <Helmet>
            <title>Available Foods | SustainEats</title>
         </Helmet>
         {/* title */}
         <Title supTitle="By Our Heroes" title="Available Foods"></Title>

         <div className="grid lg:grid-cols-2  gap-2 justify-center mb-6">
            {/* Search and Sort */}
            <form onSubmit={handleSearch} className="max-w-[500px]">
               <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300 w-full justify-between relative">
                  <input
                     className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                     onChange={(e) => setSearchText(e.target.value)}
                     value={searchText}
                     type="text"
                     name="search"
                     placeholder="Enter Food Name"
                     aria-label="Enter Food Name"
                  />

                  <button className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack border border-ourOrange right-0">
                     <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full "></span>
                     <span className="relative">Search</span>
                  </button>
               </div>
            </form>

            <div className="border p-1 rounded-lg flex justify-between items-center gap-2 max-w-[500px]">
               <label htmlFor="sort" className="px-4">
                  Sort by Expired Date:
               </label>
               <select
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                  name="sort"
                  className="bg-ourOrange p-2 rounded"
               >
                  <option value="">none</option>
                  <option value="asc">ascending</option>
                  <option value="dsc">descending</option>
               </select>
            </div>

            <button
               onClick={handleReset}
               className="px-5 py-3 rounded-lg relative  group lightButton overflow-hidden font-medium bg-ourPrimary text-white hover:text-ourPrimary inline-block border border-ourPrimary max-w-[100px]"
            >
               <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full "></span>
               <span className="relative">Reset</span>
            </button>
         </div>

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
