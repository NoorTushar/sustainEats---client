import { useParams } from "react-router-dom";

const FoodDetails = () => {
   const foodId = useParams().id;
   console.log(foodId);
   return <div></div>;
};

export default FoodDetails;
