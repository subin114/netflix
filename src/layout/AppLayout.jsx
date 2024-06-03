import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import "./AppLayout.style.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByKeyword = (e) => {
    e.preventDefault();
    // url 변경해주기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="AppLayout">
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        className={`navbar ${scroll ? "navbar-scrolled" : ""}`}
      >
        <Container fluid className="navbar-container">
          <Navbar.Brand href="/" className="logo">
            <img src="src/assets/logo.png" alt="netflix" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="category-btn"
          />
          <Navbar.Collapse id="navbarScroll" className="navbar-scroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "auto" }}
              navbarScroll
            >
              <Nav.Link href="/" className="menu">
                홈
              </Nav.Link>
              <Nav.Link href="/movies" className="menu">
                영화
              </Nav.Link>
              <Nav.Link href="/movies" className="menu">
                시리즈
              </Nav.Link>
              <Nav.Link href="/movies" className="menu">
                NEW! 요즘 대세 콘텐츠
              </Nav.Link>
              <Nav.Link href="/movies" className="menu">
                내가 찜한 리스트
              </Nav.Link>
              <Nav.Link href="/movies" className="menu">
                언어별로 찾아보기
              </Nav.Link>
            </Nav>
            <Form className="d-flex search" onSubmit={searchByKeyword}>
              <Button className="search-btn" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
              <Form.Control
                type="search"
                placeholder="제목, 사람, 장르"
                className="me-2 search-input"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
