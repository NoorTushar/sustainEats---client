import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner";

const MyRequestedFoods = () => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   const searchEmail = user?.email;
   console.log(searchEmail);

   const { data: myRequestedFoods = [], isLoading } = useQuery({
      queryFn: () => getRequestedFoods(),
      queryKey: ["myRequestedFoods", searchEmail],
   });

   const getRequestedFoods = async () => {
      const result = await axiosSecure(
         `${import.meta.env.VITE_API_URL}/requested-foods/${searchEmail}`
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
               color="#213430"
               ariaLabel="triangle-loading"
               wrapperStyle={{}}
               wrapperclassName=""
            />
         </div>
      );
   }

   console.log(myRequestedFoods);
   return (
      <div className="mt-[68px] max-w-1170px w-[90%] md:w-[82%] mx-auto">
         {/* title */}
         <div className="text-center mb-6">
            <p className="text-xl font-semibold text-ourPrimary">Check Your</p>
            <h2 className="text-[40px] font-semibold mt-1">Requested Foods</h2>
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
                     {myRequestedFoods.length}
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
                                       className="py-3.5 px-10 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       <div className="flex items-center gap-x-3">
                                          <span>Name</span>
                                       </div>
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       <span>Food Id</span>
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       <span>Donated By</span>
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       Request Date
                                    </th>
                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       Food Expiry Date
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                    >
                                       Pickup Location
                                    </th>
                                 </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                 {myRequestedFoods.map((food, index) => (
                                    <tr key={food._id}>
                                       <td className="px-3 py-3.5 text-center  text-sm font-medium text-gray-700 whitespace-nowrap">
                                          {index + 1}
                                       </td>
                                       <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                          <div className="inline-flex items-center h-full gap-x-3">
                                             <div className="flex items-center gap-x-3 h-full">
                                                <img
                                                   className="object-cover w-10 h-10 rounded-full"
                                                   src={food.req_foodImage}
                                                   alt={food.req_foodName}
                                                />
                                                <div>
                                                   <h2 className="font-medium text-gray-800 dark:text-white ">
                                                      {food.req_foodName}
                                                   </h2>
                                                </div>
                                             </div>
                                          </div>
                                       </td>

                                       <td className="px-10 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                          {food.req_foodId}
                                       </td>

                                       <td className="px-10 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                          {food.req_donorName}
                                       </td>
                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                          {food.req_date}
                                       </td>

                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                          {food.req_expiredDate}
                                       </td>

                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                          {food.req_pickupLocation}
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

export default MyRequestedFoods;
