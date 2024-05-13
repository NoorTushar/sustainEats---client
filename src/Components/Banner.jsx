import bg1 from "../assets/bg-1.jpg";
import bg2 from "../assets/bg-2.jpg";
import bg3 from "../assets/bg-3.jpg";

import "./banner.css";

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
               delay: 3500,
               disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            className="mySwiper"
         >
            <SwiperSlide>
               <Slide bgImg={bg1}></Slide>
            </SwiperSlide>

            <SwiperSlide>
               <Slide bgImg={bg2}></Slide>
            </SwiperSlide>

            <SwiperSlide>
               <Slide bgImg={bg3}></Slide>
            </SwiperSlide>
         </Swiper>
      </>
   );
};

export default Banner;
