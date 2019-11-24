import React, { Component } from "react";
import Home from "../components/Home";
import axios from "axios";

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      cityImages: [],
      cityCategories: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    axios
      .all([
        axios.get(`${process.env.REACT_APP_BASEURL}/cities`),
        axios.get(`${process.env.REACT_APP_BASEURL}/categories/all`),
        axios.get(`${process.env.REACT_APP_BASEURL}/city/images/all`),
      ])
      .then(
        axios.spread((cities, categories, images) => {
          this.setState({
            cities: cities.data.data,
            cityCategories: categories.data,
            cityImages: images.data,
          });
        })
      )
      .then(res => {
        this.setState({
          isLoading: false,
        });
      });
  }
  render() {
    const { isLoading, cities, cityCategories, cityImages } = this.state;
    return (
      <Home
        isLoading={isLoading}
        cityImages={cityImages}
        cities={cities}
        cityCategories={cityCategories}
      />
    );
  }
}
