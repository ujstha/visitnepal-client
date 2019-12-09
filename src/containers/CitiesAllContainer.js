import React, { Component } from "react";
import CitiesAll from "../components/CitiesAll";
import { GetCities } from "../services";

export default class CitiesAllContainer extends Component {
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
    GetCities().then(cities =>
      this.setState({
        cities: cities.city,
        cityCategories: cities.category,
        cityImages: cities.city_image,
        isLoading: false,
      })
    );
  }
  render() {
    const { isLoading, cities, cityCategories, cityImages } = this.state;
    return (
      <CitiesAll
        isLoading={isLoading}
        cityImages={cityImages}
        cities={cities}
        cityCategories={cityCategories}
      />
    );
  }
}
