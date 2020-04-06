import React from "react";

import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Ch from "./CrawlingRequest";
import AllCrawlingResults from "./AllCrawlingResults";
const Main = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/aboutme"></Route>
      <Route path="/contact">
        <Ch />
      </Route>
      <Route path="/projects"></Route>
      <Route path="/resume">
        <AllCrawlingResults />
      </Route>
    </Switch>
  );
};

export default Main;
