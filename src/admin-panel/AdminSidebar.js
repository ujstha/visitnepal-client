import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export default withRouter(
  class AdminSidebar extends Component {
    render() {
      const { showSidebar } = this.props;
      const { pathname } = this.props.location;

      return (
        <nav
          className={`w3-sidebar w3-collapse w3-white w3-animate-left ${
            showSidebar ? "d-block" : ""
          }`}
          style={{ zIndex: 3, width: 300 }}
          id="mySidebar"
        >
          <br />
          <div className="w3-container w3-row">
            <div className="w3-col s12 w3-bar">
              <span style={{ fontSize: "1.5rem" }}>
                <i className="fa fa-user-shield"></i> &nbsp; Welcome,{" "}
                <strong>Admin</strong>
              </span>
            </div>
          </div>
          <hr />
          <div className="w3-container">
            <h5>Dashboard</h5>
          </div>
          <div className="w3-bar-block">
            <a
              href="/dashboard"
              className={`w3-bar-item w3-button w3-padding ${pathname ===
                "/dashboard" && "w3-blue"}`}
            >
              <i className="fa fa-home fa-fw"></i>  Overview
            </a>
            <a
              href="/manage/places"
              className={`w3-bar-item w3-button w3-padding ${pathname ===
                "/manage/places" && "w3-blue"}`}
            >
              <i className="fa fa-landmark fa-fw"></i>  Places
            </a>
            <a
              href="/manage/slides"
              className={`w3-bar-item w3-button w3-padding ${pathname ===
                "/manage/slides" && "w3-blue"}`}
            >
              <i className="fa fa-list-alt fa-fw"></i>  Slides
            </a>
            <a
              href="/settings"
              className={`w3-bar-item w3-button w3-padding ${pathname ===
                "/settings" && "w3-blue"}`}
            >
              <i className="fa fa-cog fa-fw"></i>  Settings
            </a>
            <br />
            <br />
          </div>
        </nav>
      );
    }
  }
);
