import "./Homepage.style.scss";
import Banner from "./components/Banner/Banner";

// 1. 배너 => 인기 콘텐츠의 첫번째 아이템
// 2. 인기 콘텐츠
// 3. TOP 10 콘텐츠
// 4. 새로 올라온 콘텐츠

const Homepage = () => {
  return (
    <div>
      <Banner />
    </div>
  );
};

export default Homepage;
