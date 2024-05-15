/* eslint-disable react/no-unescaped-entities */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";

import { Autoplay, Pagination } from "swiper/modules";

import "./Testimonials.css";
import Title from "./Title/Title";

const Testimonials = () => {
   return (
      <>
         {/* section title */}

         <Title supTitle="what our clients say" title="Testimonials"></Title>

         <Swiper
            autoplay={{
               delay: 3500,
               disableOnInteraction: true,
            }}
            loop={true}
            pagination={{
               clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
         >
            {/* Testimonial Item */}
            <SwiperSlide className="container w-full  mx-auto">
               <div className="flex flex-col items-center w-full pt-0 p-6 space-y-8 rounded-md lg:h-full lg:p-8  lg:pt-0">
                  <img
                     src="https://i.ibb.co/PZNzgD2/kevin.jpg"
                     alt=""
                     className="w-20 h-20 rounded-full "
                  />
                  <blockquote className="max-w-4xl text-lg font-didact italic font-medium text-center">
                     "I've been using Sustain-Eats for a few months now, and I'm
                     amazed by the impact it's making in our community. The
                     platform is user-friendly and efficient, making it easy for
                     donors like me to share surplus food with those in need.
                     It's heartwarming to see the positive response from
                     recipients, and I'm proud to be part of such a meaningful
                     initiative."
                  </blockquote>
                  <div className="text-center text-ourAsh pb-4">
                     <p>Leroy Jenkins</p>
                     <p>CEO of Petra Chemicals</p>
                  </div>
               </div>
            </SwiperSlide>

            {/* Testimonial Item */}
            <SwiperSlide className="container w-full   mx-auto">
               <div className="flex flex-col items-center w-full pt-0  p-6 space-y-8 rounded-md lg:h-full lg:p-8  lg:pt-0">
                  <img
                     src="https://i.ibb.co/VCx6Y9F/negarin.jpg"
                     alt=""
                     className="w-20 h-20 rounded-full "
                  />
                  <blockquote className="max-w-4xl text-lg font-didact italic font-medium text-center">
                     "As a small business owner, reducing food waste is
                     important to me, and Sustain-Eats provides a simple yet
                     effective solution. I've been able to donate excess
                     inventory from my cafe through the platform, knowing that
                     it will benefit those who need it most. The team behind
                     Sustain-Eats is dedicated and responsive, making the
                     donation process seamless and rewarding."
                  </blockquote>
                  <div className="text-center text-ourAsh pb-4">
                     <p>Emily Smith</p>
                     <p>CEO of Smith Courier</p>
                  </div>
               </div>
            </SwiperSlide>

            {/* Testimonial Item */}
            <SwiperSlide className="container w-full   mx-auto">
               <div className="flex flex-col items-center w-full pt-0 p-6 space-y-8 rounded-md lg:h-full lg:p-8  lg:pt-0">
                  <img
                     src="https://i.ibb.co/1rtd4xJ/zech.jpg"
                     alt=""
                     className="w-20 h-20 rounded-full "
                  />
                  <blockquote className="max-w-4xl text-lg font-didact italic font-medium text-center">
                     "I'm grateful for the support I've received from
                     Sustain-Eats during challenging times. As a single parent,
                     putting food on the table can be a struggle, but thanks to
                     this platform, I've been able to access nutritious meals
                     for myself and my children. The variety of food options
                     available and the kindness of donors have made a real
                     difference in our lives. Thank you, Sustain-Eats, for
                     caring for our community."
                  </blockquote>
                  <div className="text-center text-ourAsh pb-4">
                     <p>David Johnson</p>
                     <p>Web Developer</p>
                  </div>
               </div>
            </SwiperSlide>
         </Swiper>
      </>
   );
};

export default Testimonials;
