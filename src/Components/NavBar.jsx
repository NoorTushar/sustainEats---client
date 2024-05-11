import { Link } from "react-router-dom";
import logo from "../assets/logo_sustainEats.png";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const NavBar = () => {
   const { user, logoutUser } = useAuth();

   const navItem = (
      <>
         <li>
            <Link to={"/"}>Home</Link>
         </li>
         {user?.email && (
            <li>
               <Link to={"/add-food"}>Add Food</Link>
            </li>
         )}
      </>
   );

   const handleLogOut = async () => {
      try {
         await logoutUser();
         Swal.fire({
            title: "See you soon!",
            text: "Logged out successfully!",
            icon: "success",
            confirmButtonText: "Ok",
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="navbar bg-base-100">
         <div className="navbar-start">
            <div className="dropdown z-50">
               <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                     />
                  </svg>
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
               >
                  {navItem}
               </ul>
            </div>
            <Link to={"/"} className="flex items-center gap-1">
               <img className="size-10" src={logo} alt="" />
               <span to={"/"} className="text-xl text-ourPrimary">
                  Sustain<span className="text-ourOrange">Eats</span>
               </span>
            </Link>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItem}</ul>
         </div>

         <div className="navbar-end">
            {user?.email ? (
               <div
                  className="dropdown dropdown-end z-50"
                  title={user.displayName}
               >
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost btn-circle avatar"
                  >
                     <div className="w-10 rounded-full">
                        <img
                           referrerPolicy="no-referrer"
                           alt="User Avatar"
                           src={user?.photoURL}
                        />
                     </div>
                  </div>
                  <ul
                     tabIndex={0}
                     className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                     <li>
                        <a className="justify-between">
                           Profile
                           <span className="badge">New</span>
                        </a>
                     </li>
                     <li>
                        <a>Settings</a>
                     </li>
                     <li>
                        <button onClick={handleLogOut}>Logout</button>
                     </li>
                  </ul>
               </div>
            ) : (
               <Link
                  to={`/login`}
                  className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-white text-ourBlack inline-block border border-ourOrange"
               >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-ourOrange group-hover:h-full opacity-90"></span>
                  <span className="relative">Login</span>
               </Link>
            )}
         </div>
      </div>
   );
};

export default NavBar;
