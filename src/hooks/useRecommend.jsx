import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommends = ({ movie_id }) => {
  return api.get(`/movie/${movie_id}/recommendations`);
};

export const useRecommendsQuery = ({ movie_id }) => {
  return useQuery({
    queryKey: ["recommendations", { movie_id }],
    queryFn: () => fetchRecommends({ movie_id }),
    select: (result) => result.data,
  });
};
