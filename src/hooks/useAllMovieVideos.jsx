import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchAllMovieVideos = ({ movie_id }) => {
  return api.get(`/movie/${movie_id}/videos`);
};

export const useAllMovieVideosQuery = ({ movie_id }) => {
  return useQuery({
    queryKey: ["movie-all-videos", { movie_id }],
    queryFn: () => fetchAllMovieVideos({ movie_id }),
    select: (result) => result?.data.results[0],
  });
};
