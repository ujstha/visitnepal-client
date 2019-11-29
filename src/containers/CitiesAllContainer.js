import React, { Component } from "react";
import CitiesAll from "../components/CitiesAll";
import { GetCities, GetCategories, GetCitiesImages } from "../services";

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
        cities: cities,
      })
    );
    GetCategories().then(categories => {
      this.setState({
        cityCategories: categories,
      });
    });
    GetCitiesImages()
      .then(images => {
        this.setState({
          cityImages: images,
        });
      })
      .then(res => {
        this.setState({
          isLoading: false,
        });
      });
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
