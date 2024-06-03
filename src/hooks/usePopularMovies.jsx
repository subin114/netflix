import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 보고 또 봐도 좋은 인기 영화
const fetchPopularMovies = () => {
  return api.get(`/movie/popular`);
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};
