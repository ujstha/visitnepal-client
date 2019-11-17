import React from "react";
import { Route, Switch } from "react-router-dom";
import UserAuthentication from "./components/Authentication/UserAuthentication";

export default (
  <Switch>
    <Route exact path="/" component={UserAuthentication}></Route>
  </Switch>
);
