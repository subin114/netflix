import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchReviews = ({ movie_id }) => {
  // return api.get(`/movie/${movie_id}/reviews`);
  return api.get(`/movie/${movie_id}/reviews`, {
    params: {
      language: "en-US", // 영어로 설정
    },
  });
};

export const useReviews = ({ movie_id }) => {
  return useQuery({
    queryKey: ["movie-reviews", { movie_id }],
    queryFn: () => fetchReviews({ movie_id }),
    select: (result) => result?.data.results,
  });
};
