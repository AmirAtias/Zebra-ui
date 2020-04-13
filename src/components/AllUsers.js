/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect, memo } from "react";
import API from "../utils/API";
import { Button, Container, ListGroup } from "react-bootstrap";
function AllUsers(props) {
  const [users, setUsers] = useState([]);
  const [chosenUser, setChosenUser] = useState("");
  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await API.get("/socialMedia/displayAllUsers", {
          params: {
            socialMedia: props.socialMedia,
          },
        });
        console.log("👉 Returned data:", response.data);
        if (response.data.users.length > 0) {
          setUsers(response.data.users);
        } else {
          window.alert("users not found");
        }
      } catch (e) {
        window.alert(`😱 Axios request failed: ${e}`);
      }
    }
    getAllUsers();
  }, [props.socialMedia]);

  useEffect(() => {
    if (chosenUser !== "") {
      props.displayPosts(chosenUser);
    }
    // eslint-disable-next-line
  }, [chosenUser]);

  const labelForm = css({
    width: "150px",
    fontFamily: "'Baloo 2', cursive",
    fontSize: "1.2vw",
    display: "flex",
    marginTop: "7px",
  });
  const containerCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    marginLeft: "-50px",
  });
  return (
    <div>
      <h2>all crawling results of {props.socialMedia}:</h2>
      <Container css={containerCss}>
        <ListGroup>
          {users.map((user) => (
            <Button
              variant="outline-info"
              css={labelForm}
              key={user}
              onClick={() => setChosenUser(user)}
            >
              {user}
            </Button>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default memo(AllUsers);
