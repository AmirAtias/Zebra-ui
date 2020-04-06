/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import API from "../utils/API";
import Title from "./Title";
const CrawlingRequest = () => {
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    try {
      const response = await API.post("/socialMedia/startCrawling", data);
      console.log("👉 Returned data:", response);
      if (response.data.validationSucess === "true") {
        window.alert(data.url);
        window.location.replace("/");
        console.log(data);
      } else {
        window.alert("user not found");
      }
    } catch (e) {
      window.alert(`😱 Axios request failed: ${e}`);
    }
  }

  const formCss = css({
    display: "flex",
    "flex-flow": "column wrap",
    "align-items": "center",
    "justify-content": "center",
    "padding-top": "0px"
  });
  const labelForm = css({
    width: "300px",
    "font-family": "'Baloo 2', cursive",
    "font-size": "2vw",
    margin: "0px"
  });
  const comboLabel = css({
    width: "350px",
    "font-family": "'Baloo 2', cursive",
    "font-size": "2vw"
  });
  const inputCss = css({
    width: "100%",
    padding: "8px 20px",
    margin: "8px 0",
    border: "1px solid #ccc",
    "border-radius": "2px"
  });
  const comboCss = css({
    width: "100%",
    padding: "12px 20px",
    margin: "5px 0",
    border: "none",
    "border-radius": "4px",
    "background-color": "#f1f1f1",
    "margin-bottom": "20px"
  });
  const containerCss = css({
    display: "flex",
    "flex-flow": "column wrap",
    "align-items": "center"
  });
  return (
    <Container css={containerCss}>
      <Title title="User Information" />
      <form onSubmit={handleSubmit(onSubmit)} css={formCss}>
        <div>
          <label css={labelForm} htmlFor="userName">
            User Name:
          </label>
          <input
            css={inputCss}
            name="userName"
            placeholder="enter user name in social media"
            ref={register}
          />
        </div>
        <div>
          <label css={labelForm} htmlFor="url">
            Url:
          </label>
          <input
            css={inputCss}
            name="url"
            placeholder="enter user name in social media"
            ref={register}
          />
        </div>
        <div>
          <label css={comboLabel} htmlFor="socialMedia">
            Social Network:
          </label>
          <select css={comboCss} name="socialMedia" ref={register}>
            <option value="Facebook">Facebook</option>
            <option value="WorldExplorer">WorldExplorer</option>
          </select>
        </div>
        <Button css={labelForm} type="submit" variant="outline-primary">
          Start Crawling
        </Button>{" "}
      </form>
    </Container>
  );
};

export default CrawlingRequest;
