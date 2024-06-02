import "./Banner.style.scss";
import { usePopularMoviesQuery } from "./../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import Spinner from "react-bootstrap/Spinner";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  // console.log("ddd", data);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/original${data?.results[0].backdrop_path})`,
      }}
      className="Banner"
    >
      <div className="banner-info">
        <h1 className="title">{data?.results[0].title}</h1>
        <div className="detail">
          <span>{data?.results[0].vote_average}</span>
          <span>{data?.results[0].release_date}</span>
        </div>
        <p className="overview">{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
