import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserAuthentication from "./components/Authentication/UserAuthentication";
import ErrorPage from "./components/ErrorPage";
import Event from "./components/Event";
import HomeContainer from "./containers/HomeContainer";
import DashboardContainer from "./containers/DashboardContainer";
import { GetUserRole } from "./services";
import AdminDashboard from "./admin-panel/AdminDashboard";
import CitiesAllContainer from "./containers/CitiesAllContainer";
import CityDetails from "./components/CityDetails";
import AddPlacesContainer from "./admin-panel/containers/AddPlacesContainer";
import EditPlacesContainer from "./admin-panel/containers/EditPlacesContainer";
import EditSlidersContainer from "./admin-panel/containers/EditSlidersContainer";
import AddSlidersContainer from "./admin-panel/containers/AddSlidersContainer";
import AdminSettingsContainer from "./admin-panel/containers/AdminSettingsContainer";

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
    <Route exact path="/dashboard" component={AdminDashboard}></Route>
    <Route exact path="/cities" component={CitiesAllContainer}></Route>
    <Route exact path="/city/:id" component={CityDetails}></Route>
    <Route exact path="*" component={ErrorPage}></Route>
  </Switch>
) : (sessionStorage.token || localStorage.token) &&
  JSON.parse(localStorage.isAdmin) ? (
  // user logged in and is admin
  <Switch>
    <Route exact path="/"  component={() => <Redirect to="/dashboard" />}></Route>
    <Route exact path="/dashboard" component={AdminDashboard}></Route>
    <Route exact path="/settings" component={AdminSettingsContainer}></Route>
    <Route exact path="/manage/places" component={AdminDashboard}></Route>
    <Route exact path="/manage/slides" component={AdminDashboard}></Route>
    <Route exact path="/admin" component={Event}></Route>
    <Route exact path="/add/places" component={AddPlacesContainer}></Route>
    <Route exact path="/edit/place/:id" component={EditPlacesContainer}></Route>
    <Route exact path="/add/sliders" component={AddSlidersContainer}></Route>
    <Route exact path="/edit/slide/:id" component={EditSlidersContainer}></Route>
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
