import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="error-page">
        <Helmet>
          <title>Error Page | 404 Not Found</title>
        </Helmet>
        <h1>Error Page</h1>
        <h5>404 Page Not Found</h5>
      </div>
    );
  }
}
