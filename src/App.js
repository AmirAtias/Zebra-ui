/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeContext from "./components/ThemeContext";
import { useState } from "react";

function App() {
  const [pos, setPosition] = useState("fixed");
  const BackgorundCss = css({
    background:
      "url(https://dafq4moetmy65.cloudfront.net/cdn/ff/38VK4_WtKZgW00bVoBKq_wkTcMEXR4iV1ppnQNqTRqE/1505219788/public/2017-09/Why-is-AI-a-Must-in-Social-Media-App-Development_0.jpg)",
    WebkitBackgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
    backgroundSize: "cover",
    //height: "92.5vh",
    width: "100%",
    height: "100%",
    display: "flex",
    color: "white",
    paddingTop: "3%"
  });
  return (
    <Router>
      <NavBar />
      <ThemeContext.Provider value={[pos, setPosition]}>
        <div css={BackgorundCss} style={{ position: pos }}>
          <Main />
        </div>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
