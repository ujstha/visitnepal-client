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
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/auth">Register/Login</a>
          </li>
          <li>
            <a onClick={() => logOut()} href="javascript" style={{color: "#dc3545"}}><i className="fa fa-sign-out-alt"></i> &nbsp;Logout</a>
          </li>
        </ul>
      </nav>
    );
  }
}
