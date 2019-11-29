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
        <svg viewBox="0 0 960 300">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="80%">
              404
            </text>
          </symbol>
          <g className="g-ants">
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
          </g>
        </svg>
        <div className="content">
          <h1>Page Not Found</h1>
          <a href="/">Back to Home</a>
        </div>
      </div>
    );
  }
}
