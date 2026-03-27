import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const SliderHome = ({ slides }) => {
  if (!slides || slides.length === 0) return null;

  return (
    <div className="swiper-home">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 }
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="card-slide">
              <img src={`/img/slide/${slide.imagen}`} />
              <div className="slide-caption">
                <h5>{slide.frase}</h5>
                {slide.link && (
                  <a href={slide.link} className="btn-slide">
                    Ver más
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderHome;
