import React, { Component } from "react";
import {
  GetCityById,
  GetCategoryByCityId,
  GetImageByCityId,
} from "../services";
import "../assets/css/cityDetails.css";

export default class CityDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: "",
      ID: this.props.match.params.id,
    };
  }
  componentDidMount() {
    GetImageByCityId(this.state.ID).then(res => {
      this.setState({
        images: res.map(image => image.cover_image),
      });
    });
  }
  render() {
    const { images, ID } = this.state;

    return (
      <div className="city-details-wrapper">
        <div
          className="city-bg"
          style={{
            backgroundImage: `url(${process.env.REACT_APP_IMAGEURL}/cover_images/${images})`,
          }}
        >
          <div className="city-bg-overlay"></div>
        </div>
        <div className="container-fluid">
          <h1 className="mt-3">
            This is City details {ID}
            {console.log(GetCityById(ID))}
            {console.log(GetCategoryByCityId(ID))}
            {console.log(images)}
          </h1>
        </div>
      </div>
    );
  }
}
