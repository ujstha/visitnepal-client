import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

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
            <a href="hi">hi</a>
          </li>
        </ul>
      </nav>
    );
  }
}
