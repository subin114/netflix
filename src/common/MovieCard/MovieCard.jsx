import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.style.scss";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData?.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const navigate = useNavigate();

  return (
    <div
      className="MovieCard"
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/original${movie.poster_path})`,
      }}
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="overlay">
        <div className="card-top">
          <h1 className="title">{movie?.title}</h1>
          <div className="badge-wrap">
            {showGenre(movie?.genre_ids).map((genre, idx) => (
              <Badge
                bg="danger"
                key={idx}
                style={{ marginRight: "3px" }}
                className="badge"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <div className="card-bottom">
          <span className="popular">
            <FontAwesomeIcon icon={faHeart} style={{ marginRight: "3px" }} />
            {Math.trunc(movie?.popularity).toLocaleString()}
          </span>
          <span className="avg">
            <FontAwesomeIcon
              icon={faCheckToSlot}
              style={{ marginRight: "3px" }}
            />
            {movie?.vote_average.toFixed(1)}
          </span>
          <span className="adult">
            {movie?.adult ? (
              <img src="../src/assets/over19.svg" alt="over19" />
            ) : (
              <img src="../src/assets/all.svg" alt="all" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
