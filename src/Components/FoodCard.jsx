import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
   const {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expiredDate,
      additionalNotes,
      foodStatus,
      donor,
   } = food;
   return (
      <div className="card card-compact border shadow-xl">
         <figure className="relative">
            <img src={foodImage} alt={foodName} />
            <span className="absolute bg-ourPrimary text-white text-[14px] px-6 py-2 bottom-0 left-0 z-50 ">
               {foodStatus}
            </span>
         </figure>
         <div className="card-body">
            <h2 className="card-title">{foodName}</h2>
            <p>Quantity: {foodQuantity} persons</p>
            <p>Expiry Date: {new Date(expiredDate).toLocaleDateString()}</p>
            <p>Pickup Location: {pickupLocation}</p>
            <p>Additional Notes: {additionalNotes}</p>
            {/* Donor Info */}
            <div>
               <p className="mb-2">Donated by:</p>
               <div className="flex items-center space-x-2">
                  <img
                     src={donor.donorImage}
                     className="size-12 rounded-full"
                     alt=""
                  />
                  <p>{donor.donorName}</p>
               </div>
            </div>
            <div className="card-actions justify-start mt-3">
               <Link
                  to={`/food-details/${food._id}`}
                  className="px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack inline-block border border-ourOrange"
               >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white  group-hover:h-full "></span>
                  <span className="relative">View Details</span>
               </Link>
            </div>
         </div>
      </div>
   );
};

FoodCard.propTypes = {
   food: PropTypes.object.isRequired,
};

export default FoodCard;
