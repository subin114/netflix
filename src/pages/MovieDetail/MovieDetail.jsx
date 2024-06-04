import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckToSlot,
  faPlay,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "./MovieDetail.style.scss";
import { useAllMovieQuery } from "../../hooks/useAllMovie";
import { Button, Modal, Spinner, Alert } from "react-bootstrap";
import { useState } from "react";
import YouTube from "react-youtube";
import { useAllMovieVideosQuery } from "../../hooks/useAllMovieVideos";

// modal
function MyVerticallyCenteredModal({ movie_id, ...props }) {
  const { data, isLoading, isError, error } = useAllMovieVideosQuery({
    movie_id,
  });
  console.log("비디오 데이터 내놔아아아아아아아아", data);

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
  const { data } = useAllMovieQuery({ movie_id });
  console.log("movie-detail-data", data);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div
      className="MovieDetail"
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/original${data?.backdrop_path})`,
      }}
    >
      {/* 영화 포스터 + 영화 정보 */}
      <div className="detail-wrap">
        {/* 영화 정보 */}
        <div className="info">
          <h1>{data?.title}</h1>
          <span className="tagline">{data?.tagline}</span>

          <div className="sm-info">
            <span>
              {data?.adult ? (
                <img
                  src="../src/assets/all.svg"
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
              <FontAwesomeIcon icon={faHeart} style={{ marginRight: "3px" }} />{" "}
              {data?.popularity}
            </span>
            <span>
              <FontAwesomeIcon
                icon={faCheckToSlot}
                style={{ marginRight: "3px" }}
              />{" "}
              {data?.vote_average.toFixed(1)}
            </span>
          </div>
          <p>{data?.overview}</p>

          {/* modal - 예고편 */}
          <Button onClick={() => setModalShow(true)} className="modal-btn">
            <FontAwesomeIcon icon={faPlay} style={{ marginRight: "5px" }} />
            예고편 재생
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            movie_id={movie_id}
          />
        </div>

        {/* 영화 리뷰 */}
        <div className="review-wrap">Review</div>
      </div>
    </div>
  );
};

export default MovieDetail;
