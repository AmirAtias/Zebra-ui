/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useCallback } from "react";
import AllFilters from "./AllFilters";
import Report from "./Report";
import { Container } from "react-bootstrap";

const ReportResults = (props) => {
  const [filter, setFilter] = useState("");

  const submitFilter = useCallback((filter) => {
    setFilter(filter);
  }, []);
  const containerCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
  });
  if (filter === "") {
    return (
      <AllFilters
        socialMedia={props.socialMedia}
        user={props.user}
        submitFilter={submitFilter}
      />
    );
  } else {
    return (
      <Container css={containerCss}>
        <Report
          socialMedia={props.socialMedia}
          user={props.user}
          filter={filter}
        />
      </Container>
    );
  }
};
export default ReportResults;
