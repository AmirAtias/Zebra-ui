/* eslint-disable jsx-a11y/no-onchange */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useCallback, useLayoutEffect } from "react";
import { Container } from "react-bootstrap";
import AllUsers from "./AllUsers";
import AnalyzePosts from "./AnalyzePosts";
import API from "../../utils/API";
import SocialMediaDropdown from "./SocialMediaDropdown";
import Title from "../mainComponents/Title";
import AllReports from "../reportComponents/AllReports";
import sendLog from "../../utils/Logger";

const AllCrawlingResults = (props) => {
  const [SocialMedia, setSocialMedia] = useState("Choose a social meida");
  const [displayUserPosts, setDisplayUserPosts] = useState(false);
  const [user, setUser] = useState("");
  const [authSucess, setAuthSucess] = useState(false);
  useLayoutEffect(() => {
    API.get("/users/checkToken")
      .then((res) => {
        if (res.status === 200) {
          setAuthSucess(true);
        } else {
          const error = new Error(res.data);
          throw error;
        }
      })
      .catch((err) => {
        sendLog("error", err);

        window.location.replace("/login");
      });
  });

  //only child component call for this hook
  // eslint-disable-next-line
  const displayPosts = useCallback((user) => {
    setDisplayUserPosts(true);
    setUser(user);
  }, []);

  const changeSocialMedia = useCallback((socialMedia) => {
    setSocialMedia(socialMedia);
  }, []);

  const containerCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
  });

  if (!authSucess) {
    return null;
  } else {
    return (
      <Container css={containerCss}>
        {!displayUserPosts ? (
          <div>
            <Title title="Crawling Results" />
            <SocialMediaDropdown changeSocialMedia={changeSocialMedia} />
            <Container css={containerCss}>
              {SocialMedia === "Choose a social meida" ? null : (
                <AllUsers
                  socialMedia={SocialMedia}
                  cleanDb={props.cleanDb}
                  displayPosts={displayPosts}
                />
              )}
            </Container>
          </div>
        ) : (
          <div>
            {!props.cleanDb ? (
              <AnalyzePosts
                user={user}
                socialMedia={SocialMedia}
              ></AnalyzePosts>
            ) : (
              <AllReports user={user} socialMedia={SocialMedia} />
            )}
          </div>
        )}
      </Container>
    );
  }
};

export default AllCrawlingResults;
