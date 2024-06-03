import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Spinner, Alert } from "react-bootstrap";

import MovieSlider from "./../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  // console.log("popular-movie-data", data);

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

  return (
    <div>
      <MovieSlider
        title="보고 또 봐도 좋은 인기 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
