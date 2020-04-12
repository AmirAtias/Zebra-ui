import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CrawlingRequest from "./CrawlingRequest";
import AllCrawlingResults from "./AllCrawlingResults";
import WithAuth from "./WithAuth";
const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={WithAuth(Home)} />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/CrawlingRequest" component={WithAuth(CrawlingRequest)} />
      <Route path="/AnalyzePosts" component={AllCrawlingResults} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Main;
