import React from "react";
import { Route, Switch } from "react-router-dom";
import pro from "./pro";
import UserAuthentication from "./components/Authentication/UserAuthentication";

export default (
  <Switch>
    <Route exact path="/" component={UserAuthentication}></Route>
    <Route exact path="/pro" component={pro}></Route>
  </Switch>
);
