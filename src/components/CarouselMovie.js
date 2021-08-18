
import React from "react";
import MovieCard from "./MovieCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

// import Swiper core and required modules
import SwiperCore, {
    Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);

const ListMovie = ({ movies }) => {
    const sliceMovies = movies.slice(0, 20)

    return (
        <div className="movie-carousel mb-5">
            <div className="container text-center">
                <h1 className="m-4 text-white" style={{ fontWeight: "bolder" }}>Movie Showing</h1>
                <>
                    <Swiper pagination={{
                        "clickable": true
                    }} breakpoints={{
                        0: {
                            slidesPerView: 2,
                            slidesPerColumn: 2,
                            spaceBetween: 10,
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 3,
                            slidesPerColumn: 2,
                            spaceBetween: 15,
                        },
                        // when window width is >= 992px
                        992: {
                            slidesPerView: 4,
                            slidesPerColumn: 2,
                            spaceBetween: 15,
                        },
                    }} className="mySwiper">
                        {sliceMovies.map((movie, index) => (
                            <SwiperSlide key={index}><MovieCard movie={movie} /></SwiperSlide>
                        ))}
                    </Swiper>
                </>
            </div>
        </div>
    )
}

export const CarouselMovie = React.memo(ListMovie)
