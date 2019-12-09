import React from "react";
import { Route, Switch } from "react-router-dom";
import UserAuthentication from "./components/Authentication/UserAuthentication";
import ErrorPage from "./components/ErrorPage";
import Event from "./components/Event";
import HomeContainer from "./containers/HomeContainer";
import DashboardContainer from "./containers/DashboardContainer";
import { GetUserRole } from "./services";
import AdminDashboard from "./components/admin/AdminDashboard";
import CitiesAllContainer from "./containers/CitiesAllContainer";
import CityDetails from "./components/CityDetails";

GetUserRole().then(res => {
  return res;
});

export default (!sessionStorage.token && !localStorage.token) ||
!localStorage.isAdmin ||
JSON.parse(localStorage.isAdmin) === null ? (
  // user not logged in route
  <Switch>
    <Route exact path="/" component={HomeContainer}></Route>
    <Route exact path="/auth" component={UserAuthentication}></Route>
    <Route exact path="/events" component={Event}></Route>
    <Route exact path="/admin/dashboard" component={AdminDashboard}></Route>
    <Route exact path="/cities" component={CitiesAllContainer}></Route>
    <Route exact path="/city/:id" component={CityDetails}></Route>
    <Route exact path="*" component={ErrorPage}></Route>
  </Switch>
) : (sessionStorage.token || localStorage.token) &&
  JSON.parse(localStorage.isAdmin) ? (
  // user logged in and is admin
  <Switch>
    <Route exact path="/" component={HomeContainer}></Route>
    <Route exact path="/admin/dashboard" component={AdminDashboard}></Route>
    <Route exact path="/admin" component={Event}></Route>
    <Route exact path="/cities" component={CitiesAllContainer}></Route>
    <Route exact path="/city/:id" component={CityDetails}></Route>
    <Route exact path="*" component={ErrorPage}></Route>
  </Switch>
) : (sessionStorage.token || localStorage.token) &&
  !JSON.parse(localStorage.isAdmin) ? (
  // user logged in but is not admin
  <Switch>
    <Route exact path="/" component={HomeContainer}></Route>
    <Route exact path="/dashboard" component={DashboardContainer}></Route>
    <Route exact path="/cities" component={CitiesAllContainer}></Route>
    <Route exact path="/city/:id" component={CityDetails}></Route>
    <Route exact path="*" component={ErrorPage}></Route>
  </Switch>
) : (
  <Switch>
    <Route exact path="/" component={HomeContainer}></Route>
  </Switch>
);
