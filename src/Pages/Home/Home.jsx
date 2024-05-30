import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner";
import FeaturedFoods from "../../Components/FeaturedFoods";
import Testimonials from "../../Components/Testimonials";
import AboutUs from "../../Components/AboutUs";
import DonationSection from "../../Components/DonationSection/DonationSection";

const Home = () => {
   return (
      <div>
         <Helmet>
            <title>SustainEats | Home</title>
         </Helmet>
         <section className="mt-[68px]">
            <Banner></Banner>
         </section>
         <section className="max-w-[1400px] w-[90%] md:w-[82%] mx-auto pt-[60px]">
            <AboutUs></AboutUs>
         </section>
         <section className="max-w-[1400px] w-[90%] md:w-[82%] mx-auto pt-[60px]">
            <DonationSection></DonationSection>
         </section>
         <section className="max-w-[1170px] w-[90%] md:w-[82%] mx-auto pt-[60px]">
            <FeaturedFoods></FeaturedFoods>
         </section>
         <section className="max-w-[1170px] w-[90%] md:w-[82%] mx-auto pt-[60px]">
            <Testimonials></Testimonials>
         </section>
      </div>
   );
};

export default Home;
