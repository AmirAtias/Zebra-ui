/* eslint-disable jsx-a11y/no-onchange */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import Title from "./Title";
import AllUsers from "./AllUsers";
import AnalyzePosts from "./AnalyzePosts";
const AllCrawlingResults = () => {
  const [SocialMedia, setSocialMedia] = useState("Facebook");
  const [displayUserPosts, setDisplayUserPosts] = useState("false");
  const [user, setUser] = useState("");

  const displayPosts = useCallback((user) => {
    console.log(user);
    setDisplayUserPosts("true");
    setUser(user);
  }, []);
  const labelForm = css({
    width: "200px",
    "font-family": "'Baloo 2', cursive",
    "font-size": "1.7vw",
    display: "flex",
    marginTop: "7px",
  });

  const containerCss = css({
    display: "flex",
    "flex-flow": "column wrap",
    "align-items": "center",
  });
  const ComboCss = css({
    display: "flex",
    "flex-flow": "row wrap",
    "align-items": "center",
    paddingTop: "18px",
  });

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
                <option value="Facebook">Facebook</option>
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
};

export default AllCrawlingResults;
