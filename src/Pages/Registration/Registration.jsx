import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import logo from "../../assets/logo_sustainEats.png";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
// React-Hook-Form: (1)
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
   // toggle show/ hide password - (1)
   const [showPassword, setShowPassword] = useState(false);
   const { loginWithGoogle, createUser, updateUser, setLoading } = useAuth();
   // React-Hook-Form: (2a)
   const {
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
   } = useForm();

   // React-Hook-Form: (2b)
   const onSubmit = async () => {
      const userName = getValues("userName");
      const email = getValues("email");
      const password = getValues("password");
      const photoURL = getValues("photoURL");

      console.log(userName, email, password, photoURL);

      // create user imported from AuthContext
      createUser(email, password)
         .then(() => {
            // update user imported from AuthContext
            updateUser(userName, photoURL).then(() => {
               // have to set loading to false else after
               // redirecting to page, it will keep showing the loader
               setLoading(false);

               Swal.fire({
                  title: "Success!",
                  text: "Registration Successful!",
                  icon: "success",

                  confirmButtonText: "Ok",
               });
            });
         })
         .catch((error) => {
            let errorMessage = error.message
               .split("Firebase: Error (auth/")[1]
               .split(")")[0]
               .replace(/-/g, " ");

            console.log(errorMessage);
         });
   };

   // login with google using firebase
   const handleLoginWithGoogle = async () => {
      try {
         const result = await loginWithGoogle();
         console.log(result.user);

         Swal.fire({
            title: "Success!",
            text: "Logged in successfully!",
            icon: "success",

            confirmButtonText: "Ok",
         });
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
         <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
               <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
            </div>

            <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
               Welcome!
            </p>

            {/* google login */}
            <button
               onClick={handleLoginWithGoogle}
               className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 w-full"
            >
               <div className="px-4 py-2">
                  <svg className="w-6 h-6" viewBox="0 0 40 40">
                     <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#FFC107"
                     />
                     <path
                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                        fill="#FF3D00"
                     />
                     <path
                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                        fill="#4CAF50"
                     />
                     <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#1976D2"
                     />
                  </svg>
               </div>

               <span className="w-5/6 px-4 py-3 font-bold text-center">
                  Sign in with Google
               </span>
            </button>

            <div className="flex items-center justify-between mt-4">
               <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

               <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 ">
                  register your free account
               </p>

               <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            {/* // React-Hook-Form:  */}
            <form onSubmit={handleSubmit(onSubmit)}>
               {/* Name */}
               <div className="mt-4">
                  <label
                     className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                     htmlFor="userName"
                  >
                     User Name
                  </label>
                  <input
                     // React-Hook-Form: (9)
                     {...register("userName", {
                        required: {
                           value: true,
                           message: "Must provide a username.",
                        },
                     })}
                     className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                     type="text"
                     name="userName"
                     placeholder="User name"
                  />
                  {/* // React-Hook-Form: (5) */}
                  {errors?.userName && (
                     <span className="text-red-500 block mt-1 mb-2 font-didact">
                        {errors.userName.message}
                     </span>
                  )}
               </div>

               {/* Email */}
               <div className="mt-4">
                  <label
                     className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                     htmlFor="email"
                  >
                     Email Address
                  </label>
                  <input
                     // React-Hook-Form: (4)
                     {...register("email", {
                        required: {
                           value: true,
                           message: "Must provide an email",
                        },
                        pattern: {
                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                           message: "Must provide a valid email address",
                        },
                     })}
                     className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                     type="email"
                     name="email"
                     id="email"
                     placeholder="Email"
                  />
                  {/* // React-Hook-Form: (5) */}
                  {errors?.email && (
                     <span className="text-red-500 block mt-1 mb-2 font-didact">
                        {errors.email.message}
                     </span>
                  )}
               </div>

               {/* password field */}
               <div className="mt-4">
                  <div className="flex justify-between">
                     <label
                        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                        htmlFor="loggingPassword"
                     >
                        Password
                     </label>
                  </div>

                  <div className="relative">
                     <input
                        // React-Hook-Form: (6)
                        {...register("password", {
                           required: {
                              value: true,
                              message: "Must provide a password.",
                           },
                           minLength: {
                              value: 6,
                              message:
                                 "Password must be at least of 6 characters",
                           },
                           pattern: {
                              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d!@#$%^&*()]?).{6,}$/,
                              message:
                                 "Must have at least one uppercase letter and one lowercase letter.",
                           },
                        })}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                        // toggle show/ hide password - (3)
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Password"
                     />
                     {/*  // toggle show/ hide password - (2) */}
                     {showPassword ? (
                        <IoMdEye
                           onClick={() => setShowPassword(false)}
                           className="absolute text-lg right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        />
                     ) : (
                        <IoMdEyeOff
                           onClick={() => setShowPassword(true)}
                           className="absolute text-lg right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        />
                     )}
                  </div>

                  {/* // React-Hook-Form: (7) */}
                  {errors?.password && (
                     <span className="text-red-500 block mt-1 mb-2 font-didact">
                        {errors.password.message}
                     </span>
                  )}
               </div>

               {/* photoURL field */}
               <div className="mt-4">
                  <div className="flex justify-between">
                     <label
                        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                        htmlFor="loggingPassword"
                     >
                        Photo URL
                     </label>
                  </div>

                  <div className="relative">
                     <input
                        // React-Hook-Form: (6)
                        {...register("photoURL", {
                           required: {
                              value: true,
                              message: "Must provide a photoURL.",
                           },
                        })}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                        type="text"
                        placeholder="Photo URL"
                     />
                     {errors?.photoURL && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.photoURL.message}
                        </span>
                     )}
                  </div>
               </div>

               <div className="mt-6">
                  {/* login button */}
                  <button className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-white text-ourBlack inline-block w-full border border-ourOrange">
                     <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-ourOrange group-hover:h-full opacity-90"></span>
                     <span className="relative ">Register</span>
                  </button>
               </div>
            </form>

            <div className="flex items-center justify-between mt-4">
               <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

               <Link
                  to={"/login"}
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
               >
                  or login
               </Link>

               <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
         </div>

         {/* Image */}
         <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
               backgroundImage:
                  "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
            }}
         ></div>
      </div>
   );
};

export default Registration;
