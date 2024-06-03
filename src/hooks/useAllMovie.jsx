import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchAllMovie = ({ movie_id }) => {
  return api.get(`/movie/${movie_id}`);
};

export const useAllMovieQuery = ({ movie_id }) => {
  return useQuery({
    queryKey: ["movie-all", { movie_id }],
    queryFn: () => fetchAllMovie({ movie_id }),
    select: (result) => result.data,
  });
};
