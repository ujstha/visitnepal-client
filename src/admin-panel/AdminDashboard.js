import React, { Component } from "react";
import { Loader, GetCities, GetSlides, GetAllUsers } from "../services";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import "../assets/css/adminDashboard.css";
import Helmet from "react-helmet";
import CountedData from "./components/CountedData";
import ManagePlaces from "./components/ManagePlaces";
import ManageSlides from "./components/ManageSlides";
import ManageUsers from "./components/ManageUsers";

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
      slides: []
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

              <br />

              <footer className="w3-container w3-padding-16 w3-light-grey">
                <div className="row">
                  <div className="col-md-8 col-sm-6 col-xs-12">
                    <p className="copyright-text">
                      Copyright &copy; 2019. All Rights Reserved.
                    </p>
                  </div>

                  <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="social-icons">
                      <li>
                        <a
                          className="facebook"
                          href="https://www.facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          className="twitter"
                          href="https://www.twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          className="linkedin"
                          href="https://www.linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        )}
      </div>
    );
  }
}
