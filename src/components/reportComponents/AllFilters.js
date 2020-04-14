/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Button, Container, ListGroup } from "react-bootstrap";
import Loader from "../mainComponents/Loader";
const AllFilters = (props) => {
  const [Loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    setLoading(true);
    API.get("/socialMedia/getAllFilters", {
      params: {
        socialMedia: props.socialMedia,
        userName: props.user,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setFilters(res.data.filters);
        } else {
          const error = new Error("server error");
          throw error;
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/");
      });
    // eslint-disable-next-line
  }, []);
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
        <h1>
          {" "}
          all saved results of {props.user} in {props.socialMedia}:
        </h1>
        <Container css={containerCss}>
          <h4>all filters:</h4>
          <ListGroup>
            {filters.map((filter) => (
              <Button
                variant="outline-info"
                css={labelForm}
                key={filter}
                onClick={() => props.submitFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </ListGroup>
        </Container>
      </div>
    );
  }
};

export default AllFilters;
