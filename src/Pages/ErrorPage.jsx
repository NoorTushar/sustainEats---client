import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
   const error = useRouteError();
   const navigate = useNavigate();

   const handleGoHome = () => {
      navigate("./");
   };

   return (
      <div className="min-h-screen flex items-center justify-center flex-col">
         <button
            className="btn font-bold rounded-xl hover:bg-[#23be0a] text-white bg-[#59c6d2] mb-6"
            onClick={handleGoHome}
         >
            Home
         </button>
         <div className="text-center">
            <p className="text-2xl font-bold">{error.status}</p>
            <p className="text-2xl font-bold">
               Page {error.statusText || error.message}
            </p>
            <p className="text-2xl font-bold">{error.data}</p>
         </div>
         <img
            className="w-full max-w-[400px]"
            src="../../public/error-message.png"
            alt=""
         />
      </div>
   );
};

export default ErrorPage;
