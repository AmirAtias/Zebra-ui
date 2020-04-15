/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button, Container } from "react-bootstrap";
import Title from "./Title";
import { useHistory } from "react-router-dom";

const Home = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/CrawlingRequest");
  }
  const pageContent = css({
    fontSize: "2vw",
    fontWeight: "200",
    color: "#fff",
    lineHeight: "1",
    marginTop: "40px",
    marginInline: "20px",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "3%",
  });
  const containerCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
  });
  return (
    <Container css={containerCss}>
      <Title title="Zebra" />
      <div css={pageContent}>
        <h2 style={{ paddingBottom: "3%" }}>
          Data Crawling Services for Social Media
        </h2>

        <Button variant="primary" size="lg" onClick={handleClick}>
          Start crawling now
        </Button>
      </div>
    </Container>
  );
};

export default Home;
