/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Container } from "react-bootstrap";
import Loader from "../mainComponents/Loader";
import UserPosts from "../crawlingResearch/UserPosts";
const Report = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    API.get(`/socialMedia/getSavedPosts`, {
      params: {
        socialMedia: props.socialMedia,
        userName: props.user,
        filter: props.filter,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data.allPosts);
          setLoading(false);
        } else {
          const error = new Error("server error");
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/");
      });
    // eslint-disable-next-line
  }, []);
  const containerCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
  });
  if (loading) {
    return (
      <Container>
        <Loader />{" "}
      </Container>
    );
  }
  return (
    <Container css={containerCss}>
      <h2> Final Report </h2>
      <UserPosts posts={posts} />
    </Container>
  );
};
export default Report;
