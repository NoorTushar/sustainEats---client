import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Triangle } from "react-loader-spinner";
import Title from "../../Components/Title/Title";
import { Helmet } from "react-helmet-async";

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
         <Helmet>
            <title>My Requested Foods | SustainEats</title>
         </Helmet>
         {/* title */}
         <Title supTitle="Check Your" title="Requested Foods"></Title>

         {/* Table */}
         <div>
            <section className="container px-4 mx-auto">
               <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-medium text-ourBlack">
                     Total Items
                  </h2>

                  <span className="px-3 py-1 text-xs text-black bg-ourOrange rounded-full ">
                     {myRequestedFoods.length}
                  </span>
               </div>

               <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                     <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-ourPrimary  md:rounded-lg">
                           <table className="min-w-full divide-y divide-ourPrimary ">
                              <thead className="bg-ourPrimary ">
                                 <tr>
                                    <th
                                       scope="col"
                                       className="px-3 py-3.5 text-sm font-normal text-center rtl:text-right text-white"
                                    >
                                       <span>Sl.No</span>
                                    </th>
                                    <th
                                       scope="col"
                                       className="py-3.5 px-10 text-sm font-normal text-left rtl:text-right text-white"
                                    >
                                       <div className="flex items-center gap-x-3">
                                          <span>Food Name</span>
                                       </div>
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                                    >
                                       <span>Food Id</span>
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                                    >
                                       <span>Donated By</span>
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                                    >
                                       Request Date
                                    </th>
                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                                    >
                                       Food Expiry Date
                                    </th>

                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                                    >
                                       Pickup Location
                                    </th>
                                 </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-ourPrimary  ">
                                 {myRequestedFoods.map((food, index) => (
                                    <tr key={food._id}>
                                       <td className="px-3 py-3.5 text-center  text-sm font-medium text-black whitespace-nowrap">
                                          {index + 1}
                                       </td>
                                       <td className="px-10 py-4 text-sm font-medium text-black whitespace-nowrap">
                                          <div className="inline-flex items-center h-full gap-x-3">
                                             <div className="flex items-center gap-x-3 h-full">
                                                <img
                                                   className="object-cover w-10 h-10 rounded-full"
                                                   src={food.req_foodImage}
                                                   alt={food.req_foodName}
                                                />
                                                <div>
                                                   <h2 className="font-medium text-gray-800  ">
                                                      {food.req_foodName}
                                                   </h2>
                                                </div>
                                             </div>
                                          </div>
                                       </td>

                                       <td className="px-10 py-4 text-sm text-black  whitespace-nowrap">
                                          {food.req_foodId}
                                       </td>

                                       <td className="px-10 py-4 text-sm text-black  whitespace-nowrap">
                                          {food.req_donorName}
                                       </td>
                                       <td className="px-4 py-4 text-sm text-black  whitespace-nowrap">
                                          {food.req_date}
                                       </td>

                                       <td className="px-4 py-4 text-sm text-black  whitespace-nowrap">
                                          {food.req_expiredDate}
                                       </td>

                                       <td className="px-4 py-4 text-sm text-black  whitespace-nowrap">
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
