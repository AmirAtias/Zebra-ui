/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button, Container } from "react-bootstrap";
import Title from "./Title";
const Home = () => {
  const pageContent = css({
    "font-size": "2vw",
    "font-weight": "200",
    color: "#fff",
    "line-height": "1",
    "margin-top": "40px",
    marginInline: "20px",
    display: "flex",
    "flex-flow": "column wrap",
    "align-items": "center",
    "justify-content": "center",
    margin: "3%"
  });
  const containerCss = css({
    display: "flex",
    "flex-flow": "column wrap",
    "align-items": "center"
  });
  return (
    <Container css={containerCss}>
      <Title title="Zebra" />
      <div css={pageContent}>
        <h2 style={{ paddingBottom: "3%" }}>
          Data Crawling Services for Social Media
        </h2>

        <Button variant="primary" size="lg">
          Start crawling now{" "}
        </Button>
      </div>
    </Container>
  );
};

export default Home;
