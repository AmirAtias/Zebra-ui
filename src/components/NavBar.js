/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { UserNameContext } from "./AppContext";
import API from "../utils/API";
import { Spinner } from "react-bootstrap";
const NavBar = () => {
  const [handling, setHandling] = useState(false);
  const [userName, setUserName] = useContext(UserNameContext);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await API.get("/socialMedia/requestStatus");
        console.log("👉 Returned data:", response.data);
        setHandling(response.data.handleRequest);
      } catch (e) {
        window.alert(`😱 Axios request failed: ${e}`);
      }
      return () => clearInterval(interval);
    }, 15000);
  }, []);

  async function logout() {
    const response = await API.get("/users/logout");
    console.log("logout status:" + response);
    setUserName("");
  }
  const navCss = css({
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa!important",
  });
  return (
    <div css={navCss}>
      <Container>
        <Navbar bg="light" variant="light">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Nav className="mr-auto">
            <Navbar.Brand href="/">
              <i style={{ paddingRight: "5%" }} className="fas fa-home"></i>
              Home
            </Navbar.Brand>
          </Nav>
          <Nav className="mr-auto">
            <div>
              {userName !== "" ? (
                <div style={{ color: "black" }}> wellcome {userName}</div>
              ) : null}
            </div>
          </Nav>
          <Nav>
            {handling && <Spinner animation="border" variant="primary" />}
            <NavDropdown title="User Mangement" id="nav-dropdown">
              <NavDropdown.Item href="/CrawlingRequest">
                Crawling Request
              </NavDropdown.Item>
              <NavDropdown.Item href="/AnalyzePosts">
                Analyze Posts
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Display Report
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" onSelect={logout}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};

export default NavBar;
