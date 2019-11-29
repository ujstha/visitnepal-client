import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Button } from "@material-ui/core";

export default class CityDetails extends Component {
  render() {
    return (
      <>
        <h1 className="mt-3">This is City details {this.props.match.params.id}</h1>
      </>
    );
  }
}
