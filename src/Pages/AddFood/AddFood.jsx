import useAuth from "../../Hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// React-Hook-Form: (1)
import { Controller, useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// Tanstack (1)
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Title from "../../Components/Title/Title";
import { Helmet } from "react-helmet-async";

const AddFood = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();

   // React-Hook-Form: (2a)
   const {
      control,
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: {
         donorName: `${user?.displayName}`,
         donorImage: `${user?.photoURL}`,
         donorEmail: `${user?.email}`,
         foodStatus: "Available",
      },
   });

   // Tanstack (2)
   // tanstack mutation to add food to db
   // aikhane amader food jehutu pathaite hobe so food ta lagbe
   // food ta amra bahirer thike anbo using mutateAsync()
   const { mutateAsync } = useMutation({
      mutationFn: async (food) => {
         const result = await axiosSecure.post("/foods", food);
         console.log(result.data);
      },
   });

   // React-Hook-Form: (2b)
   // er bhitore mutateAsync function use korbo tanstack mutationFn e pathanor jonne
   const onSubmit = async () => {
      const foodName = getValues("foodName");
      const foodImage = getValues("foodImage");
      const foodQuantity = getValues("foodQuantity");
      const pickupLocation = getValues("pickupLocation");
      const expiredDate = getValues("expiredDate");
      const additionalNotes = getValues("additionalNotes");
      const foodStatus = getValues("foodStatus");
      const donor = {
         donorName: getValues("donorName"),
         donorImage: getValues("donorImage"),
         donorEmail: getValues("donorEmail"),
      };

      const food = {
         foodName,
         foodImage,
         foodQuantity: parseInt(foodQuantity),
         pickupLocation,
         expiredDate,
         additionalNotes,
         foodStatus,
         donor,
      };

      console.log(food);

      // Show confirmation dialog
      const confirmationResult = await Swal.fire({
         title: "Confirm?",
         text: "Have you put everything correctly?",
         icon: "question",
         showCancelButton: true,
         confirmButtonText: "Yes, add it",
         cancelButtonText: "No, cancel",
      });

      if (confirmationResult.isConfirmed) {
         // Tanstack (3)
         try {
            await mutateAsync(food);

            Swal.fire({
               title: "Food Added Successfully!",
               text: "Thank you for your contribution",
               icon: "success",

               confirmButtonText: "Ok",
            });
            reset();
            navigate("/my-added-foods");
         } catch (error) {
            Swal.fire({
               title: "Unsuccessful",
               text: "Food could not be added.",
               icon: "error",

               confirmButtonText: "Ok",
            });
         }
      }
   };

   return (
      <div className="mt-[68px]">
         <Helmet>
            <title>Add Food | SustainEats</title>
         </Helmet>
         {/* title */}
         <Title title="Be a Hero by Adding Little" supTitle="Welcome"></Title>

         {/* form */}
         <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-ourPrimary capitalize ">
               Add Food
            </h2>
            <div className="h-[1.5px] bg-ourOrange w-20"></div>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                        {...register("foodName", {
                           required: {
                              value: true,
                              message: "Must provide an foodName",
                           },
                        })}
                        id="foodName"
                        name="foodName"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                     {errors?.foodName && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.foodName.message}
                        </span>
                     )}
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
                        {...register("foodImage", {
                           required: {
                              value: true,
                              message: "Must provide a foodImage",
                           },
                        })}
                        id="foodImage"
                        name="foodImage"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                     {errors?.foodImage && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.foodImage.message}
                        </span>
                     )}
                  </div>

                  {/* foodQuantity */}
                  <div>
                     <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="foodQuantity"
                     >
                        Food Quantity (Persons)
                     </label>
                     <input
                        {...register("foodQuantity", {
                           required: {
                              value: true,
                              message: "Must provide a foodQuantity",
                           },
                        })}
                        id="foodQuantity"
                        name="foodQuantity"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                     {errors?.foodQuantity && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.foodQuantity.message}
                        </span>
                     )}
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
                        {...register("pickupLocation", {
                           required: {
                              value: true,
                              message: "Must provide a pickupLocation",
                           },
                        })}
                        id="pickupLocation"
                        name="pickupLocation"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                     {errors?.pickupLocation && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.pickupLocation.message}
                        </span>
                     )}
                  </div>

                  {/* expiredDate */}
                  <div>
                     <label
                        htmlFor="expiredDate"
                        className="text-gray-700 dark:text-gray-200 block"
                     >
                        Expired Date
                     </label>
                     <Controller
                        control={control}
                        name="expiredDate"
                        rules={{ required: "Expired Date is required" }}
                        render={({ field }) => (
                           <DatePicker
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                           />
                        )}
                     />
                     {errors?.expiredDate && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.expiredDate.message}
                        </span>
                     )}
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
                        {...register("additionalNotes", {
                           required: {
                              value: true,
                              message: "Must provide a additionalNotes",
                           },
                        })}
                        id="additionalNotes"
                        name="additionalNotes"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                     />
                     {errors?.additionalNotes && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.additionalNotes.message}
                        </span>
                     )}
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
                        {...register("foodStatus", {
                           required: {
                              value: true,
                              message: "Must provide a foodStatus",
                           },
                        })}
                        disabled
                        id="foodStatus"
                        name="foodStatus"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                     />
                     {errors?.foodStatus && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.foodStatus.message}
                        </span>
                     )}
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
                        {...register("donorImage", {
                           required: {
                              value: true,
                              message: "Must provide a donorImage",
                           },
                        })}
                        disabled={true}
                        id="donorImage"
                        name="donorImage"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                     />
                     {errors?.donorImage && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.donorImage.message}
                        </span>
                     )}
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
                        {...register("donorName", {
                           required: {
                              value: true,
                              message: "Must provide a donorName",
                           },
                        })}
                        disabled
                        id="donorName"
                        name="donorName"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                     />
                     {errors?.donorName && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.donorName.message}
                        </span>
                     )}
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
                        {...register("donorEmail", {
                           required: {
                              value: true,
                              message: "Must provide a donorEmail",
                           },
                        })}
                        defaultValue={user?.email}
                        disabled={true}
                        id="donorEmail"
                        name="donorEmail"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring disabled:cursor-not-allowed"
                     />
                     {errors?.donorEmail && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.donorEmail.message}
                        </span>
                     )}
                  </div>
               </div>

               <div className="flex justify-center mt-6">
                  <button className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack inline-block border border-ourOrange">
                     <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full "></span>
                     <span className="relative">Add Food</span>
                  </button>
               </div>
            </form>
         </section>
      </div>
   );
};

export default AddFood;
