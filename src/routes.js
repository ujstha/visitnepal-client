import React from "react";
import { Route, Switch } from "react-router-dom";
import UserAuthentication from "./components/Authentication/UserAuthentication";
import ErrorPage from "./components/ErrorPage";
import Event from "./components/Event";
import HomeContainer from "./containers/HomeContainer";
import DashboardContainer from "./containers/DashboardContainer";
import { GetUserRole } from "./services";

GetUserRole().then(res => {
  return res;
})

export default !localStorage.isAdmin || JSON.parse(localStorage.isAdmin) === null ? (
  // user not logged in route
  <Switch>
    <Route exact path="/aaa" component={HomeContainer}></Route>
    <Route exact path="/auth" component={UserAuthentication}></Route>
    <Route exact path="*" component={ErrorPage}></Route>
  </Switch>
) : JSON.parse(localStorage.isAdmin) === true ? (
  // user logged in and is admin
  <Switch>
    <Route exact path="/admin" component={Event}></Route>
    <Route exact path="*" component={ErrorPage}></Route>
  </Switch>
) : (
  // user logged in but is not admin
  <Switch>
    <Route exact path="/" component={HomeContainer}></Route>
    <Route exact path="/dashboard" component={DashboardContainer}></Route>
    <Route exact path="/events" component={Event}></Route>
    <Route exact path="*" component={ErrorPage}></Route>
  </Switch>
);
