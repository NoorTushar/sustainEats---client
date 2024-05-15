import { useNavigate, useRouteError } from "react-router-dom";
import errorImage from "../assets/404.png";

const ErrorPage = () => {
   const error = useRouteError();
   const navigate = useNavigate();

   const handleGoHome = () => {
      navigate("./");
   };

   return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-base-400 px-4">
         <img className="w-full max-w-[800px]" src={errorImage} alt="" />
         <div className="text-center">
            <p className="text-xl md:text-3xl mt-3">
               WOOPS, MAY BE YOU ARE LOST
            </p>
            <p className="text-xl md:text-2xl mt-1">{error.data}</p>
         </div>
         <div>
            <button
               onClick={handleGoHome}
               className="px-5 mt-3 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack inline-block border border-ourOrange"
            >
               <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full opacity-100"></span>
               <span className="relative">Go back Home</span>
            </button>
         </div>
      </div>
   );
};

export default ErrorPage;
