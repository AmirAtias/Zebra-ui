import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { css } from "@emotion/core";
import API from "../utils/API";
import { Spinner } from "react-bootstrap";

const NavBar = () => {
  const [handling, setHandling] = useState(false);
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
  const navCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    justifyContent: "center",
  });
  return (
    <div css={navCss}>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <i style={{ paddingRight: "5%" }} className="fas fa-home"></i>
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
              <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
