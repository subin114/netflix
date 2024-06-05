/* eslint-disable no-unused-vars */
import { Spinner, Alert } from "react-bootstrap";
import "./MoviePage.style.scss";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { FormControl, Select, MenuItem, InputLabel, Box } from "@mui/material";

// 1. navbar에서 클릭해서 온 경우 => popularMovie 보여주기
// 2. keyword를 입력해서 온 경우 => keyword와 관련된 영화 보여주기

// [페이지네이션 구현]
// 페이지네이션 설치 + page state 만들기
// 페이지네이션 클릭할 때마다 page 변경
// page 값이 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
  // 한국어 조사 구분 함수
  const getKoreanPostposition = (word) => {
    const lastChar = word[word.length - 1];
    const hasJongseong = (lastChar) => {
      const code = lastChar.charCodeAt(0) - 44032;
      return code % 28 !== 0;
    };

    return hasJongseong(lastChar) ? "과" : "와";
  };

  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const postposition = keyword ? getKoreanPostposition(keyword) : "";

  const [page, setPage] = useState(1);
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const genres = [
    { label: "액션", value: 28 },
    { label: "모험", value: 12 },
    { label: "애니메이션", value: 16 },
    { label: "코미디", value: 35 },
    { label: "범죄", value: 80 },
    { label: "다큐멘터리", value: 99 },
    { label: "드라마", value: 18 },
    { label: "가족", value: 10751 },
    { label: "판타지", value: 14 },
    { label: "역사", value: 36 },
    { label: "공포", value: 27 },
    { label: "음악", value: 10402 },
    { label: "미스터리", value: 9648 },
    { label: "로맨스", value: 10749 },
    { label: "SF", value: 878 },
    { label: "TV 영화", value: 10770 },
    { label: "스릴러", value: 53 },
    { label: "전쟁", value: 10752 },
    { label: "서부", value: 37 },
  ];

  // 영화 정렬 (인기순)
  const [sortOrder, setSortOrder] = useState("highToLow");
  const [sortedMovies, setSortedMovies] = useState([]);

  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  // 영화 정렬 (장르별)
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenresChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // 영화 정렬 (인기순)
  useEffect(() => {
    if (data) {
      const sortedResults = [...data.results].sort((a, b) => {
        if (sortOrder === "highToLow") {
          return b.popularity - a.popularity;
        } else {
          return a.popularity - b.popularity;
        }
      });

      // 영화 정렬 (장르별)
      const filteredMovies = selectedGenre
        ? sortedResults.filter((movie) =>
            movie.genre_ids.includes(selectedGenre)
          )
        : sortedResults;

      setSortedMovies(filteredMovies);
    }
  }, [data, sortOrder, selectedGenre]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return (
      <Alert variant="danger" style={{ marginTop: "80px" }}>
        {error.message}
      </Alert>
    );
  }

  return (
    <div className="MoviePage">
      {/* 필터 */}
      <div className="filter">
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          className="select"
        >
          <InputLabel id="demo-simple-select-label">인기순</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortOrder}
            label="popular"
            onChange={handleSortOrderChange}
          >
            <MenuItem value="highToLow">인기 높은 순</MenuItem>
            <MenuItem value="lowToHigh">인기 낮은 순</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          className="select"
        >
          <InputLabel id="demo-simple-select-label">장르</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedGenre}
            label="genres"
            onChange={handleGenresChange}
          >
            {genres.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* 영화 목록 */}
      <div className="list">
        {sortedMovies.length > 0 ? (
          sortedMovies.map((movie, idx) => (
            <div key={idx} className="card-wrap">
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p>
            &quot;{keyword}&quot;
            {postposition} 일치하는 영화가 없습니다.
          </p>
        )}
      </div>

      {/* 페이지네이션 */}
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={500} // 전체페이지가 몇개인지
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
    </div>
  );
};

export default MoviePage;
