import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper/core";
import "./style/styles.css";

import { IMovieProps, IMovie } from "Routes/MovieRoute";
import { IShow, IShowProps } from "Routes/ShowRoute";

// install Swiper modules
SwiperCore.use([Autoplay, EffectCoverflow, Pagination]);

interface IHome {
  movies?: IMovie;
  shows?: IShow;
}

export default function PosterSwiper({ shows, movies }: IHome) {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={50}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {movies?.popular?.map((movie: IMovieProps, index) => (
          <SwiperSlide key={index}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={
                  movie.poster_path &&
                  `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                }
                alt="popular movie"
              />
            </Link>
          </SwiperSlide>
        ))}
        {shows?.popular?.map((show: IShowProps, index) => (
          <SwiperSlide key={index}>
            <Link to={`/show/${show.id}`}>
              <img
                src={
                  show.poster_path &&
                  `https://image.tmdb.org/t/p/w300${show.poster_path}`
                }
                alt="popular movie"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
