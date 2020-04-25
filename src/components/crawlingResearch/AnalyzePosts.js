/* eslint-disable react/jsx-key */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { ThemeContext } from "../mainComponents/AppContext";
import UserPosts from "./UserPosts";
import { Input, Button, Container } from "semantic-ui-react";
import Loader from "../mainComponents/Loader";
import sendLog from "../../utils/Logger";

const AnalyzePosts = (props) => {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("no filter");
  const [posts, setPosts] = useState({});
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [pos, setPosition] = useContext(ThemeContext);

  useEffect(() => {
    async function getAllPosts() {
      try {
        setLoading(true);
        let response;
        if (filter === "no filter") {
          response = await API.get("/socialMedia/allposts", {
            params: {
              socialMedia: props.socialMedia,
              user: props.user,
            },
          });
        } else {
          response = await API.get("/socialMedia/filterPosts", {
            params: {
              socialMedia: props.socialMedia,
              user: props.user,
              filter: filter,
            },
          });
        }
        if (response.data.allPosts.length > 0) {
          console.log("👉 Returned data:", response.data.allPosts);
          setPosts(response.data.allPosts);
          if (response.data.allPosts.length > 1) {
            setPosition("sticky");
          } else setPosition("fixed");
        } else {
          window.alert(`don't  find any post which contain the word ${filter}`);
          setFilter("no filter");
        }
        setLoading(false);
      } catch (e) {
        setError(e.message);
        if (e.message === "Request failed with status code 401") {
          window.location.replace("/login");
        } else {
          window.alert(`😱 Axios request failed: ${e}`);
        }
      }
    }
    getAllPosts();
    // eslint-disable-next-line
  }, [filter]);

  async function saveResults() {
    try {
      await API.post("/socialMedia/saveResults", {
        socialMedia: props.socialMedia,
        user: props.user,
        filter: filter,
      });

      window.location.replace("/");
    } catch (e) {
      sendLog("error", e);
      setError(e.message);
      if (e.message === "Request failed with status code 401") {
        window.location.replace("/login");
      } else {
        window.alert(`😱 Axios request failed: ${e}`);
        window.location.replace("/");
      }
    }
  }
  const element = css({
    display: "inline-block",
    paddingRight: "5px",
  });

  if (error) {
    return (
      <Container>
        <span>{error}</span>
      </Container>
    );
  }
  return (
    <div>
      <h2>
        All posts of {props.user.userName} in {props.socialMedia} :
      </h2>
      {filter !== "" && (
        <h5 style={{ paddingLeft: "20%" }}>filter by: {filter}</h5>
      )}
      <div style={{ display: "inline-block", margin: "3% 0" }}>
        <Input
          css={element}
          placeholder="enter a filter"
          onBlur={(e) => {
            setInput(e.target.value);
            e.target.value = "";
          }}
        ></Input>
        <Button
          css={element}
          content="submit filter"
          color="blue"
          onClick={() => {
            setFilter(input);
          }}
        />
        <Button
          css={element}
          content="clear filter"
          color="blue"
          onClick={() => {
            setFilter("no filter");
          }}
        />
        <Button
          css={element}
          content="save results"
          color="blue"
          onClick={saveResults}
        />
      </div>

      {!Loading ? (
        <div>
          <UserPosts posts={posts} />
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AnalyzePosts;
