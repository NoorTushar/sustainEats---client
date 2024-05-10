// import Swiper bundle with all modules installed
import { Swiper, SwiperSlide } from "swiper/react";

// import styles bundle
import "swiper/css";
import "swiper/css/bundle";

// import required modules
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import Slide from "./Slide";

const Banner = () => {
   return (
      <>
         <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            effect={"fade"}
            loop={true}
            pagination={{
               clickable: true,
            }}
            autoplay={{
               delay: 2500,
               disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            className="mySwiper"
         >
            <SwiperSlide>
               <Slide></Slide>
            </SwiperSlide>

            <SwiperSlide>
               <Slide></Slide>
            </SwiperSlide>

            <SwiperSlide>
               <Slide></Slide>
            </SwiperSlide>
         </Swiper>
      </>
   );
};

export default Banner;
