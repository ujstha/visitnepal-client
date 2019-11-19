import React from "react";
import { Route, Switch } from "react-router-dom";
import UserAuthentication from "./components/Authentication/UserAuthentication";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./components/Dashboard";

export default (
  <Switch>
    <Route exact path="/" component={UserAuthentication}></Route>
    <Route exact path="/auth" component={UserAuthentication}></Route>
    <Route exact path="/dashboard" component={Dashboard}></Route>
    <Route exact path="*" component={ErrorPage}></Route>
  </Switch>
);
