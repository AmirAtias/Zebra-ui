/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { memo } from "react";
import { Container } from "react-bootstrap";
const SocialMediaDropdown = (props) => {
  const labelForm = css({
    width: "200px",
    fontFamily: "'Baloo 2', cursive",
    fontSize: "1.7vw",
    display: "flex",
    marginTop: "7px",
  });

  const ComboCss = css({
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    paddingTop: "18px",
  });
  const containerCss = css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
  });
  return (
    <div>
      <Container css={containerCss}>
        <div css={ComboCss}>
          <label css={labelForm} htmlFor="socialmedia">
            Social Network:
          </label>
          <select
            style={{ width: "200px", marginLeft: "0px" }}
            name="SocialMedia"
            onClick={(e) => props.changeSocialMedia(e.target.value)}
          >
            <option valus="Choose a social meida" defaultValue>
              Choose a social meida
            </option>
            <option value="humhub">humhub</option>
            <option value="WorldExplorer">WorldExplorer</option>
          </select>
        </div>
      </Container>
    </div>
  );
};
export default memo(SocialMediaDropdown);
