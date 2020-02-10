import React, { Component } from "react";
import { GetCities } from "../services";
import CityByCategory from "../components/CityByCategory";

export default class CityByCategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      cityImages: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    GetCities().then(cities => 
      this.setState({
        cities: cities.city,
        cityImages: cities.city_image,
        isLoading: false,
      })
    );
  }
  render() {
    const { isLoading, cities, cityImages } = this.state;
    return (
      <CityByCategory
        isLoading={isLoading}
        cityImages={cityImages}
        cities={cities}
        category={this.props.match.params.category}
      />
    );
  }
}
