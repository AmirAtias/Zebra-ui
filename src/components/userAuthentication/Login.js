import { Menu, Segment, Container } from "semantic-ui-react";
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
const Login = () => {
  const [activeItem, setActiveItem] = useState("SignIn");
  return (
    <Container text>
      <Menu attached="top" tabular style={{ backgroundColor: "white" }}>
        <Menu.Item
          name="Sign Up"
          active={activeItem === "SignUp"}
          onClick={() => setActiveItem("SignUp")}
        />
        <Menu.Item
          name="Sign In"
          active={activeItem === "SignIn"}
          onClick={() => setActiveItem("SignIn")}
        />
      </Menu>

      <Segment attached="bottom">
        {activeItem === "SignIn" ? <SignIn /> : <SignUp />}
      </Segment>
    </Container>
  );
};
export default Login;
