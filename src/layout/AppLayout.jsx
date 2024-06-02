import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./AppLayout.style.scss";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const AppLayout = () => {
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
            <Form className="d-flex search">
              <Button className="search-btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
              <Form.Control
                type="search"
                placeholder="Search ..."
                className="me-2 search-input"
                aria-label="Search"
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
