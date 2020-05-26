/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect, memo, useContext } from "react";
import API from "../../utils/API";
import { Button, Container, ListGroup } from "react-bootstrap";
import Loader from "../mainComponents/Loader";
import sendLog from "../../utils/Logger";
import { ThemeContext } from "../mainComponents/AppContext";
function AllUsers(props) {
  // eslint-disable-next-line no-unused-vars
  const [pos, setPosition] = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllUsers() {
      try {
        setLoading(true);
        const response = await API.get("/socialMedia/displayAllUsers", {
          params: {
            socialMedia: props.socialMedia,
            cleanDb: props.cleanDb,
          },
        });
        if (response.status !== 200) {
          const error = new Error("server error");
          throw error;
        }
        if (response.data.users.length > 0) {
          if (response.data.users.length > 3) {
            setPosition("sticky");
          } else setPosition("fixed");
          setUsers(response.data.users);
        } else {
          window.alert("users not found");
          window.location.replace("/");
        }
      } catch (e) {
        sendLog("error", e);
        window.location.replace("/");
      }
      setLoading(false);
    }
    getAllUsers();
    // eslint-disable-next-line
  }, [props.socialMedia]);

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
  });
  if (Loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <h2>all crawling results of {props.socialMedia}:</h2>
        <Container css={containerCss}>
          <ListGroup>
            {users.map((user) => (
              <Button
                variant="info"
                css={labelForm}
                key={user.crawlingTime}
                onClick={() => props.displayPosts(user)}
              >
                {user.userName} - date of crawling: {user.crawlingTime}
              </Button>
            ))}
          </ListGroup>
        </Container>
      </div>
    );
  }
}

export default memo(AllUsers);
