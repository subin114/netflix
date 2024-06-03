import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { Spinner, Alert } from "react-bootstrap";

import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();
  console.log("up-coming-movie-slide-data", data);

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
        title="넷플릭스에 새로 올라온 콘텐츠"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
