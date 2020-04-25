/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
import Title from "../mainComponents/Title";
import sendLog from "../../utils/Logger";

const CrawlingRequest = () => {
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    try {
      const response = await API.post("/socialMedia/startCrawling", data);
      console.log("👉 Returned data:", response);
      if (response.data.validationSucess === "true") {
        window.alert("start to crawling!");
        window.location.replace("/");
        console.log(data);
      } else {
        window.alert("user not found");
      }
    } catch (e) {
      sendLog("error", e);
      window.alert(`😱 Axios request failed: ${e}`);
    }
  }

  const formCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "0px",
  });
  const labelForm = css({
    width: "300px",
    fontFamily: "'Baloo 2', cursive",
    fontSize: "2vw",
    margin: "0px",
  });
  const comboLabel = css({
    width: "350px",
    fontFamily: "'Baloo 2', cursive",
    fontSize: "2vw",
  });
  const inputCss = css({
    width: "100%",
    padding: "8px 20px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "2px",
  });
  const comboCss = css({
    width: "100%",
    padding: "12px 20px",
    margin: "5px 0",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#f1f1f1",
    marginBottom: "20px",
  });
  const containerCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
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
            placeholder="enter url of profile in social media"
            ref={register}
          />
        </div>
        <div>
          <label css={comboLabel} htmlFor="socialMedia">
            Social Network:
          </label>
          <select css={comboCss} name="socialMedia" ref={register}>
            <option value="humhub">humhub</option>
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
