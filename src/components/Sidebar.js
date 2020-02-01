import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { logOut } from "../services";
import "../assets/css/sidebar.css";

export default withRouter(
  class Sidebar extends Component {
    render() {
      const path = this.props.location.pathname;
      const commonLink = (
        <>
          <li>
            <a
              href="/"
              className={`menu-item ${
                path === "/" ? "MuiButton-containedPrimary text-light" : ""
              }`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/cities"
              className={`menu-item ${
                path === "/cities"
                  ? "MuiButton-containedPrimary text-light"
                  : ""
              }`}
            >
              Cities
            </a>
          </li>
        </>
      );

      return (
        <nav className={this.props.className}>
          <div className="p-1 close-toggle" onClick={this.props.toggle}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </div>
          {!localStorage.token && !sessionStorage.token ? (
            <ul>
              {commonLink}
              <li>
                <a
                  href="/auth"
                  className={`menu-item ${
                    path === "/auth"
                      ? "MuiButton-containedPrimary text-light"
                      : ""
                  }`}
                >
                  Login
                </a>
              </li>
            </ul>
          ) : (
            <ul>
              {commonLink}
              <li>
                <a
                  href="/dashboard"
                  className={`menu-item ${
                    path === "/dashboard"
                      ? "MuiButton-containedPrimary text-light"
                      : ""
                  }`}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <span
                  onClick={() => logOut()}
                  style={{ color: "#dc3545" }}
                  className="menu-item"
                >
                  <i className="fa fa-sign-out-alt"></i> &nbsp;Logout
                </span>
              </li>
            </ul>
          )}
        </nav>
      );
    }
  }
);
