/* eslint-disable react/no-unescaped-entities */

import Title from "./Title/Title";

const AboutUs = () => {
   return (
      <>
         <Title title="About Us" supTitle="Get to Know"></Title>

         <div className="relative">
            <div className="lg:absolute z-10 lg:max-w-[40%] bg-ourOrange lg:top-1/2 lg:-translate-y-1/2">
               <p className="p-6 lg:pl-10 text-black">
                  Sustain Eats is a pioneering platform committed to addressing
                  the pressing issue of food surplus and insecurity by
                  harnessing the power of community engagement and technological
                  innovation. Founded on the fundamental principles of
                  sustainability and social responsibility, our initiative seeks
                  to bridge the gap between surplus food providers and those in
                  need, thereby fostering a more equitable and resilient food
                  system.
               </p>
            </div>

            <div className="lg:max-w-[82%] ml-auto">
               <img
                  className="w-full object-cover"
                  src="https://i.ibb.co/fdKC55T/about-us.jpg"
                  alt=""
               />
            </div>
         </div>
      </>
   );
};

export default AboutUs;
