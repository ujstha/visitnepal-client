import React from "react";
import { Route, Switch } from "react-router-dom";
import UserAuthentication from "./components/Authentication/UserAuthentication";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./components/Dashboard";
import HomeContainer from "./containers/HomeContainer";

export default (
  <Switch>
    <Route exact path="/" component={HomeContainer}></Route>
    <Route exact path="/auth" component={UserAuthentication}></Route>
    <Route exact path="/dashboard" component={Dashboard}></Route>
    <Route exact path="*" component={ErrorPage}></Route>
  </Switch>
);
