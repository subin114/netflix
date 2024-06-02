import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import "./AppLayout.style.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByKeyword = (e) => {
    e.preventDefault();
    // url 변경해주기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div className="AppLayout">
      <Navbar expand="lg" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/" className="logo">
            <img src="src/assets/logo.png" alt="netflix" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="category-btn"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="menu">
                Home
              </Nav.Link>
              <Nav.Link href="/movies" className="menu">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex search" onSubmit={searchByKeyword}>
              <Button className="search-btn" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
              <Form.Control
                type="search"
                placeholder="Search ..."
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
