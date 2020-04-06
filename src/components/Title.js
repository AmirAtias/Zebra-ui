/** @jsx jsx */
import { jsx, css } from "@emotion/core";
function Title(props) {
  const titleText = css({
    "font-size": "6vw",
    "font-weight": "700",
    color: "#fff",
    "line-height": "1"
  });

  return <h1 css={titleText}>{props.title}</h1>;
}

export default Title;
