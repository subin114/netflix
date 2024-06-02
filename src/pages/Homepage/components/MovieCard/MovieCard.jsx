import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.style.scss";

const MovieCard = ({ movie }) => {
  return (
    <div
      className="MovieCard"
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/original${movie.poster_path})`,
      }}
    >
      <div className="overlay">
        <div className="card-top">
          <h1 className="title">{movie.title}</h1>
          <div className="badge-wrap">
            {movie.genre_ids.map((id) => (
              <Badge
                bg="danger"
                key={id}
                style={{ marginRight: "3px" }}
                className="badge"
              >
                {id}
              </Badge>
            ))}
          </div>
        </div>

        <div className="card-bottom">
          <span className="avg">
            <FontAwesomeIcon
              icon={faStar}
              style={{ marginRight: "3px", color: "#FFD400" }}
            />
            {movie.vote_average.toFixed(1)}
          </span>
          <span className="popular">
            <FontAwesomeIcon
              icon={faHeart}
              style={{ marginRight: "3px", color: "#DB4455" }}
            />
            {Math.trunc(movie.popularity).toLocaleString()}
          </span>
          <span className="adult">
            {movie.adult ? (
              <img src="./src/assets/over19.svg" alt="over19" />
            ) : (
              <img src="./src/assets/all.svg" alt="all" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
