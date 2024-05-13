import PropTypes from "prop-types";
import logo from "../../assets/logo_sustainEats.png";

const Title = ({ title, supTitle }) => {
   return (
      <div className="text-center pt-2 pb-12">
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
