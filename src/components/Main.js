import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import CrawlingRequest from "./CrawlingRequest";
import AllCrawlingResults from "./AllCrawlingResults";
const Main = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/aboutme"></Route>
      <Route path="/CrawlingRequest">
        <CrawlingRequest />
      </Route>
      <Route path="/projects"></Route>
      <Route path="/AnalyzePosts">
        <AllCrawlingResults />
      </Route>
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Main;
