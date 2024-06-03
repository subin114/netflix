import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 넷플릭스에 새로 올라온 콘텐츠
const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming`);
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};
