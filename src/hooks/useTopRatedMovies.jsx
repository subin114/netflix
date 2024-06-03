import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 평점 높은 영화
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
