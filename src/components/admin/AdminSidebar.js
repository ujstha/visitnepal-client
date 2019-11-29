import React, { Component } from "react";

export default class AdminSidebar extends Component {
  render() {
    const { showSidebar } = this.props;
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
          <a href="#" className="w3-bar-item w3-button w3-padding w3-blue">
            <i className="fa fa-users fa-fw"></i>  Overview
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-eye fa-fw"></i>  Views
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-users fa-fw"></i>  Traffic
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-bullseye fa-fw"></i>  Geo
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-diamond fa-fw"></i>  Orders
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-bell fa-fw"></i>  News
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-bank fa-fw"></i>  General
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-history fa-fw"></i>  History
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding">
            <i className="fa fa-cog fa-fw"></i>  Settings
          </a>
          <br />
          <br />
        </div>
      </nav>
    );
  }
}
