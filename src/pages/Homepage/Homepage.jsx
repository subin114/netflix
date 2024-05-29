import "./Homepage.style.scss";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";

// 1. 배너 => 인기 콘텐츠의 첫번째 아이템
// 2. 인기 콘텐츠
// 3. TOP 10 콘텐츠
// 4. 새로 올라온 콘텐츠

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
    </div>
  );
};

export default Homepage;
