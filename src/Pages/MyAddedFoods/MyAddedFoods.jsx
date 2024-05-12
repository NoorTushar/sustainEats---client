import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyAddedFoods = () => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   const searchEmail = user?.email;

   const {
      data: myAddedFoods = [],
      isLoading,
      refetch,
   } = useQuery({
      queryFn: () => getAddedFoods(),
      queryKey: ["myAddedFoods", searchEmail],
   });

   const getAddedFoods = async () => {
      const result = await axiosSecure(
         `${import.meta.env.VITE_API_URL}/foods/${searchEmail}`
      );

      return result.data;
   };

   // tantack delete method
   const { mutateAsync: deleteMutateAsync } = useMutation({
      mutationFn: async (foodId) => {
         console.log(`hi from tanstack`);
         const result = await axiosSecure.delete(
            `${import.meta.env.VITE_API_URL}/food/${foodId}`
         );

         return result.data;
      },
   });

   const handleDeleteFood = async (foodId) => {
      const confirmationResult = await Swal.fire({
         title: "Delete Food",
         text: "Are you sure you want to delete this food?",
         icon: "question",
         showCancelButton: true,
         confirmButtonText: "Yes, delete it",
         cancelButtonText: "No, cancel",
      });

      // If user confirms, update the food
      if (confirmationResult.isConfirmed) {
         try {
            await deleteMutateAsync(foodId);

            refetch();

            Swal.fire({
               title: "Food Deleted Successfully!",
               text: "Hoping to see you contribute soon again.",
               icon: "success",
               confirmButtonText: "Ok",
            });
         } catch (error) {
            Swal.fire({
               title: "Error Updating!",
               text: `Food was not updated: ${error}`,
               icon: "error",
               confirmButtonText: "Ok",
            });
         }
      }
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
               wrapperclassName=""
            />
         </div>
      );
   }

   return (
      <div className="mt-[68px] max-w-1170px w-[90%] md:w-[82%] mx-auto">
         {/* title */}
         <div className="text-center mb-6">
            <p className="text-xl font-semibold text-ourPrimary">
               Hero`s Contribution
            </p>
            <h2 className="text-[40px] font-semibold mt-1">My Added Foods</h2>
            <div className="bg-ourOrange h-[2px] w-16 mx-auto mt-3"></div>
         </div>

         {/* Table */}
         <div>
            <section className="container px-4 mx-auto">
               <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-medium text-ourOrange">
                     Total Items
                  </h2>

                  <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                     {myAddedFoods.length}
                  </span>
               </div>

               <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                     <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className="bg-gray-50 dark:bg-gray-800">
                                 <tr>
                                    <th
                                       scope="col"
                                       className="px-3 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       <span>Sl.No</span>
                                    </th>
                                    <th
                                       scope="col"
                                       className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       <div className="flex items-center gap-x-3">
                                          <span>Name</span>
                                       </div>
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       <span>Status</span>
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       <span>Quantity</span>
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       Expiry Date
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       Pickup Location
                                    </th>

                                    <th
                                       scope="col"
                                       className="relative py-3.5 px-4"
                                    >
                                       <span className="sr-only">Edit</span>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                 {myAddedFoods.map((food, index) => (
                                    <tr key={food._id}>
                                       <td className="px-3 py-3.5 text-center  text-sm font-medium text-gray-700 whitespace-nowrap">
                                          {index + 1}
                                       </td>
                                       <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                          <div className="inline-flex items-center gap-x-3">
                                             <div className="flex items-center gap-x-3">
                                                <img
                                                   className="object-cover w-10 h-10 rounded-full"
                                                   src={food.foodImage}
                                                   alt={food.foodName}
                                                />
                                                <div>
                                                   <h2 className="font-medium text-gray-800 dark:text-white ">
                                                      {food.foodName}
                                                   </h2>
                                                </div>
                                             </div>
                                          </div>
                                       </td>
                                       <td className="px-9 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                             <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                   food.foodStatus ===
                                                      "Available" &&
                                                   "bg-emerald-500"
                                                } ${
                                                   food.foodStatus ===
                                                      "Requested" &&
                                                   "bg-yellow-500"
                                                }`}
                                             ></span>

                                             <h2
                                                className={`text-sm font-normal ${
                                                   food.foodStatus ===
                                                      "Available" &&
                                                   "text-emerald-500"
                                                } ${
                                                   food.foodStatus ===
                                                      "Requested" &&
                                                   "text-yellow-500"
                                                } `}
                                             >
                                                {food.foodStatus}
                                             </h2>
                                          </div>
                                       </td>
                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                          {food.foodQuantity}
                                       </td>
                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                          {new Date(
                                             food.expiredDate
                                          ).toLocaleDateString()}
                                       </td>
                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                          {food.pickupLocation}
                                       </td>

                                       <td className="px-4 py-4 text-sm whitespace-nowrap">
                                          <div className="flex items-center gap-x-6">
                                             {/* delete button */}
                                             <button
                                                onClick={() =>
                                                   handleDeleteFood(food._id)
                                                }
                                                className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                                             >
                                                <svg
                                                   xmlns="http://www.w3.org/2000/svg"
                                                   fill="none"
                                                   viewBox="0 0 24 24"
                                                   strokeWidth="1.5"
                                                   stroke="currentColor"
                                                   className="w-5 h-5"
                                                >
                                                   <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                   />
                                                </svg>
                                             </button>

                                             {/* update button */}
                                             <Link
                                                to={`/updateFood/${food._id}`}
                                                className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                                             >
                                                <svg
                                                   xmlns="http://www.w3.org/2000/svg"
                                                   fill="none"
                                                   viewBox="0 0 24 24"
                                                   strokeWidth="1.5"
                                                   stroke="currentColor"
                                                   className="w-5 h-5"
                                                >
                                                   <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                   />
                                                </svg>
                                             </Link>
                                          </div>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

export default MyAddedFoods;
