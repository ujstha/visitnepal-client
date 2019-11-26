import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class Event extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Event | VisitNepal</title>
        </Helmet>
        <h1>This is event page</h1>
      </div>
    );
  }
}
