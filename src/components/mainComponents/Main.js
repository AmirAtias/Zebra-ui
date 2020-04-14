import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "../userAuthentication/Login";
import CrawlingRequest from "../crawlingResearch/CrawlingRequest";
import AllCrawlingResults from "../crawlingResearch/AllCrawlingResults";
import WithAuth from "../userAuthentication/WithAuth";
const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={WithAuth(Home)} />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/CrawlingRequest" component={WithAuth(CrawlingRequest)} />
      <Route path="/AnalyzePosts">
        <AllCrawlingResults cleanDb={false} />
      </Route>
      <Route path="/displayReport">
        <AllCrawlingResults cleanDb={true} />
      </Route>

      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Main;
