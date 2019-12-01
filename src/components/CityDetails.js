import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {
  GetCityById,
  GetCategoryByCityId,
  GetImageByCityId,
  GetAvgRatingByCityId,
  GetCommentByCityId,
  GetRatingByCityId,
} from "../services";
import "../assets/css/cityDetails.css";

export default class CityDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: {},
      categories: [],
      comments: [],
      images: "",
      rating: [],
      ratingLength: null,
      ID: this.props.match.params.id,
    };
  }
  componentDidMount() {
    const cityID = this.state.ID.replace(/[^0-9]/g, "");

    GetCityById(cityID).then(res => {
      this.setState({ cities: res });
    });
    GetCategoryByCityId(cityID).then(res => {
      this.setState({ categories: res });
    });
    GetImageByCityId(cityID).then(res => {
      this.setState({
        images: res.map(image => image.cover_image),
      });
    });
    GetRatingByCityId(cityID).then(res => {
      this.setState({
        ratingLength: res.length,
      });
    });
    GetAvgRatingByCityId(cityID).then(res => {
      this.setState({
        rating: res,
      });
    });
    GetCommentByCityId(cityID).then(res => {
      this.setState({
        comments: res,
      });
    });
  }
  render() {
    const {
      cities,
      categories,
      images,
      rating,
      comments,
      ratingLength,
    } = this.state;

    return (
      <div className="city-details-wrapper">
        {cities !== {} && (
          <>
            <Helmet>
              <title>{`${cities.city_name} - Everything you need to know about ${cities.city_name} | VisitNepal`}</title>
            </Helmet>
            <div
              className="city-bg"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_IMAGEURL}/cover_images/${images})`,
              }}
            >
              <div className="city-bg-overlay"></div>
              <div className="city-bg-detail">
                <span>{cities.city_name} Travel Guide</span>
              </div>
              <div className="ratings-reviews">
                <div className="ratings">
                  <i className="fa fa-star"></i>&nbsp;&nbsp;
                  {rating ? (
                    <span>
                      {rating} / 5 &nbsp;<sub>({ratingLength} votes)</sub>
                    </span>
                  ) : (
                    <span>No ratings</span>
                  )}
                </div>
                <div className="reviews">
                  <i className="fa fa-comment text-light"></i>&nbsp;&nbsp;
                  {comments.length !== 0 ? (
                    <span className="text-light">
                      {comments.length} &nbsp;{" "}
                      {comments.length === 1 ? "Review" : "Reviews"}
                    </span>
                  ) : (
                    <span className="text-light">No reviews</span>
                  )}
                </div>
              </div>
            </div>
            <div className="ratings">
              <strong>ratings</strong>
            </div>
          </>
        )}
      </div>
    );
  }
}
