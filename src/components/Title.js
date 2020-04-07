/** @jsx jsx */
import { jsx, css } from "@emotion/core";
function Title(props) {
  const titleText = css({
    fontSize: "6vw",
    fontWeight: "700",
    color: "#fff",
    lineHeight: "1",
  });

  return <h1 css={titleText}>{props.title}</h1>;
}

export default Title;
