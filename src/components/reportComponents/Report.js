/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useEffect, useState, useContext } from "react";
import API from "../../utils/API";
import { Container } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import Loader from "../mainComponents/Loader";
import UserPosts from "../crawlingResearch/UserPosts";
import sendLog from "../../utils/Logger";
import { createNodes, createEdges } from "../../utils/ConvertDataFromApi";
import NetworkGraph from "./NetworkGraph.js";
import { ThemeContext } from "../mainComponents/AppContext";
import Title from "../mainComponents/Title";

const Report = (props) => {
  const [posts, setPosts] = useState([]);
  const [nodes, setNodes] = useState();
  const [edges, setEdges] = useState();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [pos, setPosition] = useContext(ThemeContext);

  useEffect(() => {
    API.get(`/socialMedia/getSavedPosts`, {
      params: {
        socialMedia: props.socialMedia,
        user: props.user,
        filter: props.filter,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          let retNodes = createNodes(res.data.connections, props.user.userName);
          let retEdges = createEdges(res.data.connections.length);
          setNodes(retNodes);
          setEdges(retEdges);
          setPosts(res.data.allPosts);
          setLoading(false);
          setPosition("sticky");
        } else {
          const error = new Error("server error");
          throw error;
        }
      })
      .catch((err) => {
        sendLog("error", err);
        window.location.replace("/");
      });
    // eslint-disable-next-line
  }, []);
  const containerCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    paddingBottom: "10%",
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
      <Title style={{ paddingBottom: "4%" }} title={"Final Report"} />
      <div style={{ paddingTop: "2%" }}>
        <Button color="blue" onClick={() => window.print()}>
          Print Report
        </Button>
      </div>
      <h3 style={{ paddingTop: "2%" }}>
        {props.user.userName} social network graph:{" "}
      </h3>
      <NetworkGraph nodes={nodes} edges={edges} />
      <h3 style={{ paddingTop: "2%" }}>
        all saved posts{" "}
        {props.filter ? <span>filter by {props.filter}:</span> : null}
      </h3>
      <UserPosts posts={posts} style={{ paddingTop: "5%" }} />
    </Container>
  );
};
export default Report;
