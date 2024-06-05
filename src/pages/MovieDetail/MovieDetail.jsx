import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckToSlot,
  faPlay,
  faHeart,
  faVideo,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import "./MovieDetail.style.scss";
import { useAllMovieQuery } from "../../hooks/useAllMovie";
import { Modal, Spinner, Alert } from "react-bootstrap";
import { useState } from "react";
import YouTube from "react-youtube";
import { useAllMovieVideosQuery } from "../../hooks/useAllMovieVideos";
import { useRecommendsQuery } from "../../hooks/useRecommend";
import MovieSlider from "../../common/MovieSlider/MovieSlider";
import { responsive } from "../../constants/responsive";
import Button from "@mui/material/Button";
import { useReviews } from "../../hooks/useReviews";

/** 예고편 modal */
function MyVerticallyCenteredModal({ movie_id, ...props }) {
  const { data, isLoading, isError, error } = useAllMovieVideosQuery({
    movie_id,
  });

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return (
      <Alert variant="warning" style={{ marginTop: "80px" }}>
        {error.message}
      </Alert>
    );
  }

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const _onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h5>{data?.name}</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <YouTube
          videoId={data?.key}
          opts={opts}
          onReady={_onReady}
          className="youtube"
        />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const MovieDetail = () => {
  const { id: movie_id } = useParams();
  const { data, isLoading, isError, error } = useAllMovieQuery({ movie_id });

  const { data: recommendData } = useRecommendsQuery({ movie_id });

  const { data: reviews } = useReviews({ movie_id });
  console.log("reviews", reviews);

  const [modalShow, setModalShow] = useState(false);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <Alert variant="warning">{error.message}</Alert>;
  }

  return (
    <div
      className="MovieDetail"
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/original${data?.backdrop_path})`,
      }}
    >
      {/* 영화 정보 */}
      <div className="info-wrap">
        <h1>{data?.title}</h1>
        <span className="tagline">{data?.tagline}</span>

        <div className="sm-info">
          <span>
            {data?.adult ? (
              <img
                src="../src/assets/over19.svg"
                alt="over19"
                className="adult"
              />
            ) : (
              <img src="../src/assets/all.svg" alt="all" className="adult" />
            )}
          </span>
          <span>{data?.runtime}분</span>
          <span>{data?.release_date}</span>
          <span>
            <FontAwesomeIcon icon={faHeart} style={{ marginRight: "4px" }} />{" "}
            {data?.popularity}
          </span>
          <span>
            <FontAwesomeIcon
              icon={faCheckToSlot}
              style={{ marginRight: "4px" }}
            />{" "}
            {data?.vote_average.toFixed(1)}
          </span>
        </div>
        <p>{data?.overview}</p>

        <span>
          <Button variant="contained" color="error" className="play-btn">
            <FontAwesomeIcon icon={faPlay} style={{ marginRight: "5px" }} />
            재생
          </Button>
          <Button
            variant="contained"
            onClick={() => setModalShow(true)}
            className="modal-btn"
          >
            <FontAwesomeIcon icon={faVideo} style={{ marginRight: "5px" }} />
            예고편 재생
          </Button>
        </span>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          movie_id={movie_id}
        />
      </div>

      {/* 추천 영화 */}
      <div className="recommends-wrap">
        <MovieSlider
          title="함께 시청된 콘텐츠"
          movies={recommendData?.results || []}
          responsive={responsive}
        />
      </div>

      <div className="scroll-animation">
        <span></span>
        <span></span>
        <span></span>scroll
      </div>

      {/* 리뷰 */}
      <div className="review-wrap">
        <h2>
          [{data?.title}] <span>관람평</span>
        </h2>
        <div className="review-box">
          {reviews && reviews.length > 0 ? (
            reviews?.slice(0, 4).map((review, idx) => (
              <div key={idx} className="review">
                <span>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    style={{ marginRight: "5px" }}
                  />{" "}
                  {review?.author}
                </span>
                <p>{review?.content}</p>
              </div>
            ))
          ) : (
            <p>작성된 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
