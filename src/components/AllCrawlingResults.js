/* eslint-disable jsx-a11y/no-onchange */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useCallback, useLayoutEffect } from "react";
import { Container } from "react-bootstrap";
import Title from "./Title";
import AllUsers from "./AllUsers";
import AnalyzePosts from "./AnalyzePosts";
import API from "../utils/API";

const AllCrawlingResults = () => {
  const [SocialMedia, setSocialMedia] = useState("humhub");
  const [displayUserPosts, setDisplayUserPosts] = useState("false");
  const [user, setUser] = useState("");
  const [authSucess, setAuthSucess] = useState(false);
  useLayoutEffect(() => {
    API.get("/users/checkToken")
      .then((res) => {
        if (res.status === 200) {
          setAuthSucess(true);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/login");
      });
  });

  // eslint-disable-next-line

  const displayPosts = useCallback((user) => {
    setDisplayUserPosts("true");
    setUser(user);
  }, []);
  const labelForm = css({
    width: "200px",
    fontFamily: "'Baloo 2', cursive",
    fontSize: "1.7vw",
    display: "flex",
    marginTop: "7px",
  });

  const containerCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
  });
  const ComboCss = css({
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    paddingTop: "18px",
  });
  if (!authSucess) {
    return null;
  } else {
    return (
      <Container css={containerCss}>
        {displayUserPosts === "false" ? (
          <div>
            <Title title="Crawling Results" />
            <Container>
              <div css={ComboCss}>
                <label css={labelForm} htmlFor="socialmedia">
                  Social Network:
                </label>
                <select
                  style={{ width: "200px", marginLeft: "0px" }}
                  name="SocialMedia"
                  onChange={(e) => setSocialMedia(e.target.value)}
                >
                  <option value="humhub">humhub</option>
                  <option value="WorldExplorer">WorldExplorer</option>
                </select>
              </div>
              <AllUsers socialMedia={SocialMedia} displayPosts={displayPosts} />
            </Container>
          </div>
        ) : (
          <div>
            <AnalyzePosts user={user} socialMedia={SocialMedia}></AnalyzePosts>
          </div>
        )}
      </Container>
    );
  }
};

export default AllCrawlingResults;
