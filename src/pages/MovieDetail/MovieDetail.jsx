import { useParams } from "react-router-dom";
import "./MovieDetail.style.scss";
import { useAllMovieQuery } from "../../hooks/useAllMovie";

const MovieDetail = () => {
  const { id: movie_id } = useParams();
  const { data } = useAllMovieQuery({ movie_id });
  console.log("movie-detail-data", data);

  return (
    <div className="MovieDetail">
      <h1>{data?.title}</h1>
    </div>
  );
};

export default MovieDetail;
