import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddFood = () => {
   const { user } = useAuth();
   const [startDate, setStartDate] = useState(new Date());

   const handleAddFood = (e) => {
      e.preventDefault();

      const form = e.target;
      const foodName = form.foodName.value;
      const foodImage = form.foodImage.value;
      const foodQuantity = form.foodQuantity.value;
      const pickupLocation = form.pickupLocation.value;
      const expiredDate = form.expiredDate.value;
      const additionalNotes = form.additionalNotes.value;
      const foodStatus = form.foodStatus.value;
      const donor = {
         donorImage: form.donorImage.value,
         donorName: form.donorName.value,
         donorEmail: form.donorEmail.value,
      };

      console.log({
         foodName,
         foodImage,
         foodQuantity,
         pickupLocation,
         expiredDate,
         additionalNotes,
         foodStatus,
         donor,
      });
   };

   return (
      <div className="mt-[68px]">
         {/* title */}
         <div className="text-center mb-6">
            <p className="text-xl font-semibold text-ourPrimary">Welcome</p>
            <h2 className="text-[40px] font-semibold mt-1">
               You Can Help Lots of People by Adding Little
            </h2>
            <div className="bg-ourOrange h-[2px] w-16 mx-auto mt-3"></div>
         </div>

         {/* form */}
         <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-ourPrimary capitalize ">
               Add Food
            </h2>

            <form onSubmit={handleAddFood}>
               <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  {/* foodName */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="foodName"
                     >
                        Food Name
                     </label>
                     <input
                        id="foodName"
                        name="foodName"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                  </div>

                  {/* foodImage */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="foodImage"
                     >
                        Food Image
                     </label>
                     <input
                        id="foodImage"
                        name="foodImage"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                  </div>

                  {/* foodQuantity */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="foodQuantity"
                     >
                        Food Quantity
                     </label>
                     <input
                        id="foodQuantity"
                        name="foodQuantity"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                  </div>

                  {/* pickupLocation */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="pickupLocation"
                     >
                        Pickup Location
                     </label>
                     <input
                        id="pickupLocation"
                        name="pickupLocation"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                  </div>

                  {/* expiredDate */}
                  <div>
                     <p className="text-gray-700 dark:text-gray-200">
                        Expired Date
                     </p>
                     <DatePicker
                        name="expiredDate"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                  </div>

                  {/* additionalNotes */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="additionalNotes"
                     >
                        Additional Notes
                     </label>
                     <input
                        id="additionalNotes"
                        name="additionalNotes"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                  </div>

                  {/* foodStatus */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="foodStatus"
                     >
                        Food Status
                     </label>
                     <input
                        defaultValue={"Available"}
                        id="foodStatus"
                        name="foodStatus"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                  </div>

                  {/* donorImage */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="donorImage"
                     >
                        Donor Image
                     </label>
                     <input
                        defaultValue={user?.photoURL}
                        disabled={true}
                        id="donorImage"
                        name="donorImage"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                     />
                  </div>

                  {/* donorName */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="donorName"
                     >
                        Donor Name
                     </label>
                     <input
                        defaultValue={user?.displayName}
                        disabled={true}
                        id="donorName"
                        name="donorName"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                     />
                  </div>

                  {/* donorEmail */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="donorEmail"
                     >
                        Donor Email
                     </label>
                     <input
                        defaultValue={user?.email}
                        disabled={true}
                        id="donorEmail"
                        name="donorEmail"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                     />
                  </div>
               </div>

               <div className="flex justify-center mt-6">
                  <button className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack inline-block border border-ourOrange">
                     <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
                     <span className="relative">Add Food</span>
                  </button>
               </div>
            </form>
         </section>
      </div>
   );
};

export default AddFood;
