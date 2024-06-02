import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Spinner, Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./PopularMovieSlide.style.scss";
import MovieCard from "../MovieCard/MovieCard";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("ddddddddddd", data);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <Alert variant="warning">{error.message}</Alert>;
  }

  /** 반응형 */
  const responsive = {
    desktop1: {
      breakpoint: { max: 3000, min: 1880 },
      items: 8,
    },
    desktop2: {
      breakpoint: { max: 1880, min: 1700 },
      items: 7,
    },
    desktop3: {
      breakpoint: { max: 1700, min: 1550 },
      items: 6,
    },
    desktop4: {
      breakpoint: { max: 1550, min: 1300 },
      items: 5,
    },
    desktop5: {
      breakpoint: { max: 1300, min: 1080 },
      items: 4,
    },
    tablet1: {
      breakpoint: { max: 1080, min: 865 },
      items: 3,
    },
    tablet2: {
      breakpoint: { max: 865, min: 645 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 645, min: 300 },
      items: 1,
    },
  };

  return (
    <div className="PopularMovieSlide">
      <h3 className="main-title">Popular Movies</h3>
      <Carousel
        infinite={true} // 무한 반복
        centerMode={true} // 센터에서 보여지게
        itemClass="movie-slider-p-1"
        containerClass="carousel-container"
        responsive={responsive}
        className="carousel-custom"
      >
        {data.results.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default PopularMovieSlide;
