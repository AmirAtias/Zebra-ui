/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useEffect, useState, useContext } from "react";
import API from "../../utils/API";
import { Button, Container, ListGroup } from "react-bootstrap";
import Loader from "../mainComponents/Loader";
import sendLog from "../../utils/Logger";
import { ThemeContext } from "../mainComponents/AppContext";
const AllFilters = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [pos, setPosition] = useContext(ThemeContext);
  const [Loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    setLoading(true);
    API.get("/socialMedia/getAllFilters", {
      params: {
        socialMedia: props.socialMedia,
        user: props.user,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.filters.length > 6) {
            setPosition("sticky");
          } else setPosition("fixed");
          setFilters(res.data.filters);
        } else {
          const error = new Error("server error");
          throw error;
        }
        setLoading(false);
      })
      .catch((err) => {
        sendLog("error", err);
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
          all saved results of {props.user.userName} in {props.socialMedia}:
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
