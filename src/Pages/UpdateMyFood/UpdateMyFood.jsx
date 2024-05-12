import { useMutation, useQuery } from "@tanstack/react-query";
import { Triangle } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const UpdateMyFood = () => {
   const navigate = useNavigate();
   // food id nicchi jeita diye data fetch and pore update korbo
   const foodId = useParams().id;

   const axiosSecure = useAxiosSecure();

   // tanstack query for GET Method (1) : id er against e data load korbo
   // steps:
   // 1 - useQuery()
   // 2 - data and oitar akta name dibo and initially ki object naki array.
   // 3 - queryFn: async function diye data load and return the data
   // 4 - queryKey
   const {
      data: food = {},
      isLoading,
      refetch,
   } = useQuery({
      queryFn: async () => {
         const result = await axiosSecure(
            `${import.meta.env.VITE_API_URL}/food/${foodId}`
         );
         console.log(result.data);
         //  must return the result
         return result.data;
      },
      // important foodId ta aikhane deya as foodId change hoile abar
      // queryFn ta run hobe and updated data fetch korbe
      queryKey: ["food", foodId],
   });

   const {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expiredDate,
      additionalNotes,

      foodStatus,
   } = food;

   const parsedExpiredDate = food?.expiredDate
      ? new Date(food.expiredDate)
      : null;

   console.log(expiredDate);
   // React-Hook-Form: (2a)
   const {
      control,
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm();

   // React-Hook-Form: (2b)
   // er bhitore mutateAsync function use korbo tanstack mutationFn e pathanor jonne
   const onSubmit = async () => {
      const foodName = getValues("foodName");
      const foodImage = getValues("foodImage");
      const foodQuantity = getValues("foodQuantity");
      const pickupLocation = getValues("pickupLocation");
      const expiredDate = getValues("expiredDate");
      const additionalNotes = getValues("additionalNotes");

      const food = {
         foodName,
         foodImage,
         foodQuantity,
         pickupLocation,
         expiredDate,
         additionalNotes,
         foodStatus,
      };

      // Show confirmation dialog
      const confirmationResult = await Swal.fire({
         title: "Update Food",
         text: "Are you sure you want to update this food?",
         icon: "question",
         showCancelButton: true,
         confirmButtonText: "Yes, update it",
         cancelButtonText: "No, cancel",
      });

      // If user confirms, update the food
      if (confirmationResult.isConfirmed) {
         try {
            await mutateAsync(food);

            refetch();

            Swal.fire({
               title: "Food Updated Successfully!",
               text: "Thank you for your contribution",
               icon: "success",
               confirmButtonText: "Ok",
            });

            navigate("/my-added-foods");
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

   // tantack put method
   const { mutateAsync } = useMutation({
      mutationFn: async (food) => {
         console.log(`hi from tanstack`, food);
         const result = await axiosSecure.put(
            `${import.meta.env.VITE_API_URL}/food/${foodId}`,
            food
         );

         return result.data;
      },
   });

   // tanstack query for GET Method (2) : data load howa porjonto akta loader dekhabo
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
      <div className="mt-[68px]">
         {/* title */}
         <div className="text-center mb-6">
            <p className="text-xl font-semibold text-ourPrimary">
               Welcome Again Hero
            </p>
            <h2 className="text-[40px] font-semibold mt-1">
               Want to update anything?
            </h2>
            <div className="bg-ourOrange h-[2px] w-16 mx-auto mt-3"></div>
         </div>

         {/* form */}
         <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-ourPrimary capitalize ">
               Update Food
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
                        defaultValue={foodName}
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
                        defaultValue={foodImage}
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
                        Food Quantity
                     </label>
                     <input
                        {...register("foodQuantity", {
                           required: {
                              value: true,
                              message: "Must provide a foodQuantity",
                           },
                        })}
                        defaultValue={foodQuantity}
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
                        defaultValue={pickupLocation}
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
                        defaultValue={parsedExpiredDate} // Set defaultValue instead of defaultValues
                        render={({ field }) => (
                           <DatePicker
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-ourPrimary focus:ring-ourPrimary focus:ring-opacity-40 dark:focus:border-ourPrimary focus:outline-none focus:ring"
                           />
                        )}
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
                        {...register("additionalNotes", {
                           required: {
                              value: true,
                              message: "Must provide a additionalNotes",
                           },
                        })}
                        defaultValue={additionalNotes}
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
                        {...register("foodStatus")}
                        disabled
                        defaultValue={foodStatus}
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
                  {/* <div>
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
                  </div> */}

                  {/* donorName */}
                  {/* <div>
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
                  </div> */}

                  {/* donorEmail */}
                  {/* <div>
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
                  </div> */}
               </div>

               <div className="flex justify-center mt-6">
                  <button className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack inline-block border border-ourOrange">
                     <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
                     <span className="relative">Update Food</span>
                  </button>
               </div>
            </form>
         </section>
      </div>
   );
};

export default UpdateMyFood;
