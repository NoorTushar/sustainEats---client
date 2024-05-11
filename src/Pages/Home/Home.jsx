import Banner from "../../Components/Banner";
import FeaturedFoods from "../../Components/FeaturedFoods";

const Home = () => {
   return (
      <div>
         <div className="mt-[68px]">
            <Banner></Banner>
         </div>
         <div className="max-w-[1170px] w-[90%] md:w-[82%] mx-auto">
            <FeaturedFoods></FeaturedFoods>
         </div>
      </div>
   );
};

export default Home;
