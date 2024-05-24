import PropTypes from "prop-types";
import logo from "../../assets/logo_sustainEats.png";

import celebrationAnimation from "../../assets/Animation - 1715790822282.json";
import Lottie from "lottie-react";

const Title = ({ title, supTitle }) => {
   return (
      <div className="text-center pt-2 pb-12 relative">
         {/* <div className="w-full max-w-[400px] mx-auto absolute top-0 left-0 right-0 -z-40 text-center flex items-center">
            <Lottie loop={true} animationData={celebrationAnimation}></Lottie>
         </div> */}
         <img src={logo} className="size-20 mx-auto mb-2" alt="" />
         <p className="text-xl font-semibold text-ourPrimary">{supTitle}</p>
         <h2 className="text-[40px] font-semibold mt-1">{title}</h2>
         <div className="bg-ourOrange h-[2px] w-16 mx-auto mt-3"></div>
      </div>
   );
};

Title.propTypes = {
   title: PropTypes.string.isRequired,
   supTitle: PropTypes.string.isRequired,
};

export default Title;
