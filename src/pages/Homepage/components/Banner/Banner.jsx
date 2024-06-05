import "./Banner.style.scss";
import { usePopularMoviesQuery } from "./../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return (
      <Alert variant="danger" style={{ marginTop: "80px" }}>
        {error.message}
      </Alert>
    );
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
        <div className="rank">
          <span>오늘의 영화 순위 1위</span>
        </div>
        <p className="overview">{data?.results[0].overview}</p>
        <span>
          <Button variant="contained" color="error" className="play-btn">
            <FontAwesomeIcon icon={faPlay} style={{ marginRight: "5px" }} />
            재생
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Banner;
