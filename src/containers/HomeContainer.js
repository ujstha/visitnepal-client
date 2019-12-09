import React, { Component } from "react";
import Home from "../components/Home";
import { GetCities } from "../services";

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: {},
      isLoading: true,
    };
  }
  componentDidMount() {
    GetCities().then(cities =>
      this.setState({
        cities: cities,
        isLoading: false
      })
    );
  }
  render() {
    const { isLoading, cities } = this.state;
    return (
      <Home
        isLoading={isLoading}
        cities={cities}
        cityCategories={cities.category}
      />
    );
  }
}
