import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import "react-multi-carousel/lib/styles.css";
import "./MovieSlider.style.scss";

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div className="MovieSlider">
      <h3 className="main-title">{title}</h3>
      <Carousel
        infinite={true} // 무한 반복
        centerMode={true} // 센터에서 보여지게
        itemClass="movie-slider-p-1"
        containerClass="carousel-container"
        responsive={responsive}
        className="carousel-custom"
      >
        {movies?.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
