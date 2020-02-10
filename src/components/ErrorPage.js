import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/error.css";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="error-page">
        <Helmet>
          <title>Error Page | 404 Not Found</title>
        </Helmet>
        <a href="/"><h1 style={{fontFamily: `"Cookie", cursive`, fontStyle: "italic"}}>VisitNepal</h1></a>
        <div className="content">
          <h1>Error 404 : Page Not Found</h1>
          <a className="btn btn-primary btn-lg rounded-0" href="/"><i className="fa fa-arrow-left"></i> Back to Home</a>
        </div>
      </div>
    );
  }
}
