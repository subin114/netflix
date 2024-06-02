import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// Top Rated Movies
const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated`);
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top-rated"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};
