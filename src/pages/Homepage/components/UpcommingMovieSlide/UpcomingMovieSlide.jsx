import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { Spinner, Alert } from "react-bootstrap";

import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();
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

  return (
    <div>
      <MovieSlider
        title="Upcoming Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
