import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { logOut } from "../services";
import "../assets/css/sidebar.css";

export default class Sidebar extends Component {
  render() {
    return (
      <nav className={this.props.className}>
        <div className="p-1 close-toggle" onClick={this.props.toggle}>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
        {!localStorage.token && !sessionStorage.token ? (
          <ul>
            <li>
              <a href="/" className="menu-item">
                Home
              </a>
            </li>
            <li>
              <a href="/auth" className="menu-item">
                Register/Login
              </a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href="/" className="menu-item">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="menu-item">
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
