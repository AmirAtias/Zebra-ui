import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import React from "react";
import { css } from "@emotion/core";
const NavBar = () => {
  const navCss = css({
    display: "flex",
    "flex-flow": "column wrap",
    "align-items": "center",
    "justify-content": "center"
  });
  return (
    <div css={navCss}>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
            <NavDropdown title="user mangement" id="nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
