/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { UserNameContext } from "./AppContext";
import API from "../../utils/API";
import { Spinner } from "react-bootstrap";
import sendLog from "../../utils/Logger";

const NavBar = () => {
  const [handling, setHandling] = useState(false);
  const [userName, setUserName] = useContext(UserNameContext);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await API.get("/socialMedia/requestStatus");
        setHandling(response.data.handleRequest);
      } catch (e) {
        window.alert(`😱 Axios request failed: ${e}`);
      }
      return () => clearInterval(interval);
    }, 2000);
  }, []);

  async function logout() {
    try {
      await API.get("/users/logout");
      setUserName("");
    } catch (e) {
      sendLog("error", e);
    }
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
                <div style={{ color: "black" }}> welcome {userName}</div>
              ) : null}
            </div>
          </Nav>
          <Nav>
            {handling && <Spinner animation="border" variant="primary" />}
            <NavDropdown title="User Mangement" id="nav-dropdown">
              <NavDropdown.Item href="/crawlingRequest">
                Crawling Request
              </NavDropdown.Item>
              <NavDropdown.Item href="/analyzePosts">
                Analyze Posts
              </NavDropdown.Item>
              <NavDropdown.Item href="/displayReport">
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
