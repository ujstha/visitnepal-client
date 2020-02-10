import React, { Component } from "react";
import {
  Loader,
  GetCities,
  GetSlides,
  GetAllUsers,
  GetPages
} from "../services";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import "../assets/css/adminDashboard.css";
import Helmet from "react-helmet";
import CountedData from "./components/CountedData";
import ManagePlaces from "./components/ManagePlaces";
import ManageSlides from "./components/ManageSlides";
import ManageUsers from "./components/ManageUsers";
import ManagePages from "./components/ManagePages";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      count: {},
      users: [],
      usersImages: [],
      cities: [],
      citiesImages: [],
      slides: [],
      pages: []
    };
  }
  componentDidMount() {
    const BASEURL = process.env.REACT_APP_BASEURL;
    axios.get(`${BASEURL}/count/all`).then(res =>
      this.setState({
        count: res.data
      })
    );
    GetAllUsers().then(res => {
      this.setState({
        users: res.data.users,
        usersImages: res.data.userImages
      });
    });
    GetCities().then(res => {
      this.setState({
        cities: res.city,
        citiesImages: res.city_image
      });
    });
    GetSlides().then(res => {
      this.setState({
        slides: res
      });
    });
    GetPages().then(res => {
      this.setState({
        pages: res
      });
    });
  }
  toggleNav = () => {
    this.setState({
      showSidebar: !this.state.showSidebar
    });
  };
  render() {
    const { isLoading } = this.props;
    const {
      showSidebar,
      users,
      usersImages,
      cities,
      citiesImages,
      slides,
      pages,
      count
    } = this.state;
    const { pathname } = this.props.location;
    return (
      <div>
        {isLoading ? (
          Loader(isLoading)
        ) : (
          <div className="admin-dashboard">
            <Helmet>
              <title>VisitNepal | Admin Dashboard</title>
            </Helmet>
            <AdminHeader
              toggleNav={this.toggleNav}
              toggleDropDown={this.toggleDropDown}
            />
            <AdminSidebar showSidebar={showSidebar} />

            <div
              className="w3-overlay w3-hide-large w3-animate-opacity"
              style={{ cursor: "pointer" }}
              title="close side menu"
              id="myOverlay"
            ></div>

            <div className="w3-main" style={{ marginLeft: 300 }}>
              <header className="w3-container" style={{ paddingTop: 22 }}>
                <a href="/dashboard">
                  <h5>
                    <b>
                      <i className="fab fa-dashcube"></i> &nbsp; My Dashboard
                    </b>
                  </h5>
                </a>
              </header>
              <CountedData count={count} />
              {(pathname === "/manage/users" || pathname === "/dashboard") && (
                <ManageUsers users={users} usersImages={usersImages} />
              )}
              {(pathname === "/manage/places" || pathname === "/dashboard") && (
                <ManagePlaces cities={cities} citiesImages={citiesImages} />
              )}
              {(pathname === "/manage/slides" || pathname === "/dashboard") && (
                <ManageSlides slides={slides} />
              )}
              {(pathname === "/manage/pages" || pathname === "/dashboard") && (
                <ManagePages pages={pages} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
