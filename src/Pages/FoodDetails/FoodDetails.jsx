import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const FoodDetails = () => {
   const foodId = useParams().id;
   const { user } = useAuth();

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

   const handleCloseModal = () => {
      document.getElementById("request_form_modal").close();
   };

   const handleMakeRequest = (e) => {
      e.preventDefault();

      const form = e.target;
      const foodName = form.foodName.value;
      // Perform request handling logic here
      console.log("Request made!", foodName);
      alert("request made");
      handleCloseModal(); // Close modal after request is made
   };

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
               <button
                  onClick={() =>
                     document.getElementById("request_form_modal").showModal()
                  }
                  className="inline-block px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack border border-ourOrange mt-4"
               >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white  group-hover:h-full opacity-90"></span>
                  <span className="relative">Make Request</span>
               </button>

               {/* Modal: Request Form */}
               <dialog id="request_form_modal" className="modal">
                  <div className="modal-box">
                     <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleCloseModal}
                     >
                        ✕
                     </button>
                     <h3 className="font-bold text-lg text-ourPrimary">
                        Make a Request
                     </h3>
                     <form onSubmit={handleMakeRequest}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                           {/* requestorEmail */}
                           <div>
                              <label
                                 className="text-gray-700 dark:text-gray-200"
                                 htmlFor="foodName"
                              >
                                 Requested By
                              </label>
                              <input
                                 defaultValue={user?.email}
                                 id="req_email"
                                 name="req_email"
                                 type="email"
                                 disabled
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                              />
                           </div>

                           {/* requestedDate */}
                           <div>
                              <label
                                 className="text-gray-700 dark:text-gray-200"
                                 htmlFor="foodName"
                              >
                                 Requested On
                              </label>
                              <input
                                 id="req_date"
                                 name="req_date"
                                 type="text"
                                 defaultValue={new Date().toLocaleDateString()}
                                 disabled
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                              />
                           </div>
                           {/* foodName */}
                           <div>
                              <label
                                 className="text-gray-700 dark:text-gray-200"
                                 htmlFor="req_foodName"
                              >
                                 Food Name
                              </label>
                              <input
                                 defaultValue={foodName}
                                 id="req_foodName"
                                 name="req_foodName"
                                 type="text"
                                 disabled
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                              />
                           </div>
                           {/* foodImage */}
                           <div>
                              <label
                                 className="text-gray-700 dark:text-gray-200"
                                 htmlFor="req_foodImage"
                              >
                                 Food Image
                              </label>
                              <input
                                 defaultValue={foodImage}
                                 disabled
                                 id="req_foodImage"
                                 name="req_foodImage"
                                 type="text"
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                              />
                           </div>
                           {/* Food Id */}
                           <div>
                              <label
                                 className="text-gray-700 dark:text-gray-200"
                                 htmlFor="req_foodId"
                              >
                                 Food Id
                              </label>
                              <input
                                 defaultValue={food._id}
                                 disabled
                                 id="req_foodId"
                                 name="req_foodId"
                                 type="text"
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                              />
                           </div>

                           <div>
                              <label
                                 className="text-gray-700 dark:text-gray-200"
                                 htmlFor="req_donorName"
                              >
                                 Donor Name
                              </label>
                              <input
                                 defaultValue={donor?.donorName}
                                 disabled={true}
                                 id="req_donorName"
                                 name="req_donorName"
                                 type="text"
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                              />
                           </div>
                           {/* donorEmail */}
                           <div>
                              <label
                                 className="text-gray-700 dark:text-gray-200"
                                 htmlFor="req_donorEmail"
                              >
                                 Donor Email
                              </label>
                              <input
                                 defaultValue={donor.donorEmail}
                                 disabled={true}
                                 id="req_donorEmail"
                                 name="req_donorEmail"
                                 type="text"
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                              />
                           </div>

                           {/* pickupLocation */}
                           <div>
                              <label
                                 className="text-gray-700 dark:text-gray-200"
                                 htmlFor="req_pickupLocation"
                              >
                                 Pickup Location
                              </label>
                              <input
                                 id="req_pickupLocation"
                                 name="req_pickupLocation"
                                 disabled
                                 defaultValue={pickupLocation}
                                 type="text"
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                              />
                           </div>
                           {/* expiredDate */}
                           <div>
                              <p className="text-gray-700 dark:text-gray-200">
                                 Expired Date
                              </p>
                              <input
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                                 type="text"
                                 disabled
                                 name="req_expiredDate"
                                 defaultValue={new Date(
                                    expiredDate
                                 ).toLocaleDateString()}
                              />
                           </div>

                           {/* additionalNotes */}
                           <div>
                              <label
                                 className="text-gray-700 dark:text-gray-200"
                                 htmlFor="req_additionalNotes"
                              >
                                 Additional Notes
                              </label>
                              <input
                                 required
                                 id="req_additionalNotes"
                                 name="req_additionalNotes"
                                 type="text"
                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                              />
                           </div>
                        </div>

                        <button
                           type="submit"
                           className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack inline-block border border-ourOrange"
                        >
                           <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
                           <span className="relative">Request</span>
                        </button>
                     </form>
                  </div>
               </dialog>
            </div>
         </div>
      </section>
   );
};

export default FoodDetails;
