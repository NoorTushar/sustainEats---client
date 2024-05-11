import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

const FoodDetails = () => {
   const foodId = useParams().id;

   const { data: food = {}, isLoading } = useQuery({
      queryFn: async () => {
         const result = await axios(
            `${import.meta.env.VITE_API_URL}/food/${foodId}`
         );
         console.log(result.data);
         //  must return the result
         return result.data;
      },
      queryKey: ["food"],
   });

   const {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expiredDate,
      additionalNotes,
      foodStatus,
      donor,
   } = food;

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

   return (
      <section className="mt-[68px] max-w-1170px w-[90%] md:w-[82%] mx-auto">
         {/* title */}
         <div className="text-center mb-6">
            <p className="text-xl font-semibold text-ourPrimary">Food</p>
            <h2 className="text-[40px] font-semibold mt-1">Details</h2>
            <div className="bg-ourOrange h-[2px] w-16 mx-auto mt-3"></div>
         </div>

         {/* food details section */}
         <div className="max-w-[1170px] mx-auto w-[90%] md:w-[82%]">
            {/* grid container */}
            <div className=" grid lg:grid-cols-7 gap-10 mt-[60px] items-center">
               {/* img */}
               <div className="lg:col-span-4">
                  <img src={foodImage} alt={foodName} />
               </div>
               {/* details */}
               <div className="lg:col-span-3">
                  <h2 className="capitalize  text-[35px] font-medium tracking-[2px] -mt-3">
                     {foodName}
                  </h2>

                  <div className="*:mb-3 mt-6">
                     <div className="flex items-center gap-2">
                        <h3 className="capitalize text-[17px] tracking-[1px] font-medium  ">
                           status:{" "}
                        </h3>
                        <p className=" capitalize leading-[25px] ">
                           {foodStatus}
                        </p>
                     </div>

                     <div className="flex items-center gap-2">
                        <h3 className="capitalize text-[17px] tracking-[1px] font-medium  ">
                           quantity:{" "}
                        </h3>
                        <p className=" capitalize leading-[25px] ">
                           {foodQuantity}
                        </p>
                     </div>

                     <div className="flex items-center gap-2">
                        <h3 className="capitalize text-[17px] tracking-[1px] font-medium  ">
                           Pickup Location:{" "}
                        </h3>
                        <p className=" capitalize leading-[25px] ">
                           {pickupLocation}
                        </p>
                     </div>

                     <div className="flex items-center gap-2">
                        <h3 className="capitalize text-[17px] tracking-[1px] font-medium  ">
                           expiry date:{" "}
                        </h3>
                        <p className=" capitalize leading-[25px] ">
                           {new Date(expiredDate).toLocaleDateString()}
                        </p>
                     </div>
                  </div>

                  <div>
                     <h3 className="capitalize text-[17px] tracking-[1px] font-medium ">
                        Donated By:
                     </h3>
                     <div className="h-[1px] bg-ourOrange w-[160px] my-2"></div>
                     <div className="flex items-center space-x-4 mt-3">
                        <img
                           src={donor.donorImage}
                           className="size-14 rounded-full"
                           alt=""
                        />
                        <p>{donor.donorName}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* bottom short description section */}
            <div className="mt-6">
               <h3 className=" tracking-[1.2px] w-[180px] capitalize border-b border-ourOrange py-2">
                  additional-info
               </h3>
               <p className=" leading-[25px]  my-3">{additionalNotes}</p>
               <button className="inline-block px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack border border-ourOrange mt-4">
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white  group-hover:h-full opacity-90"></span>
                  <span className="relative">Make Request</span>
               </button>
            </div>
         </div>
      </section>
   );
};

export default FoodDetails;
