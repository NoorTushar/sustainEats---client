import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner";
import FeaturedFoods from "../../Components/FeaturedFoods";
import Testimonials from "../../Components/Testimonials";
import AboutUs from "../../Components/AboutUs";

const Home = () => {
   return (
      <div>
         <Helmet>
            <title>SustainEats | Home</title>
         </Helmet>
         <div className="mt-[68px]">
            <Banner></Banner>
         </div>
         <div className="max-w-[1400px] w-[90%] md:w-[82%] mx-auto">
            <AboutUs></AboutUs>
         </div>
         <div className="max-w-[1170px] w-[90%] md:w-[82%] mx-auto">
            <FeaturedFoods></FeaturedFoods>
         </div>
         <div className="max-w-[1170px] w-[90%] md:w-[82%] mx-auto">
            <Testimonials></Testimonials>
         </div>
      </div>
   );
};

export default Home;
