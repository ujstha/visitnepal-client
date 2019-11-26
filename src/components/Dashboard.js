import React, { Component } from "react";
import { logOut } from "../services";
import { Helmet } from "react-helmet";

export default class Dashboard extends Component {
  render() {
    const { userImages, userDetails, userName } = this.props;
    return (
      <div>
        <Helmet>
          <title>{`Dashboard | ${userName}`}</title>
        </Helmet>
        <h1>My Profile</h1>
        {userImages.map(a => a.id)}
        <br />
        <button onClick={() => logOut()}>Logout</button>
        {userDetails.map(a => a.id)}
      </div>
    );
  }
}
