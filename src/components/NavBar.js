import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import React from "react";
import { css } from "@emotion/core";
const NavBar = () => {
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
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
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
