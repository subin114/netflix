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
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="PopularMovieSlide">
      <h3>Popular Movies</h3>
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
