import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Slide = ({ bgImg }) => {
   return (
      <div
         className="hero min-h-[calc(100vh-68px)]"
         style={{
            backgroundImage: `url(${bgImg})`,
         }}
      >
         <div className="hero-overlay bg-opacity-70"></div>
         <div className="hero-content text-center ">
            <div className="max-w-3xl">
               <p className="text-white text-lg mb-2">Lend a Helping Hand</p>
               <h1 className="mb-5 text-5xl font-bold text-ourOrange leading-[60px]">
                  This world needs{" "}
                  <span className="text-ourPrimary">heroes</span> like{" "}
                  <span className="text-ourPrimary">you</span> and{" "}
                  <span className="text-ourPrimary">me</span>
               </h1>
               <p className="mb-5 text-white text-2xl">
                  Let us not waste food anymore. There is plenty to share for
                  others.
               </p>
               <Link
                  to={"/add-food"}
                  className="inline-block px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack border border-ourOrange mt-4"
               >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white  group-hover:h-full "></span>
                  <span className="relative">Add Food</span>
               </Link>
            </div>
         </div>
      </div>
   );
};

Slide.propTypes = {
   bgImg: PropTypes.string.isRequired,
};

export default Slide;
