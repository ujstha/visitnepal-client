import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {
  GetCityById,
  GetCategoryByCityId,
  GetImageByCityId,
  GetAvgRatingByCityId,
  GetCommentByCityId,
  GetRatingByCityId,
  CircularLoader,
} from "../services";
import "../assets/css/cityDetails.css";
import { Paper, Button } from "@material-ui/core";

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
      isLoading: true,
      ID: this.props.match.params.id,
    };
  }
  componentDidMount() {
    const cityID = this.state.ID.replace(/[^0-9]/g, "");

    GetCityById(cityID).then(res => {
      this.setState({ cities: res, isLoading: false });
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
      isLoading,
    } = this.state;

    return (
      <div className="city-details-wrapper">
        {isLoading
          ? CircularLoader(isLoading)
          : cities !== {} && (
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
                          {comments.length} &nbsp;
                          {comments.length === 1 ? "Review" : "Reviews"}
                        </span>
                      ) : (
                        <span className="text-light">No reviews</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="container-fluid my-3">
                  <h2>Details</h2>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <p className="cities-description">{cities.description}</p>
                    </div>
                    <div className="col-md-12">
                      <Button variant="outlined" fullWidth color="primary">Show Reviews</Button>
                    </div>
                  </div>
                  {categories && categories.length !== 0 && (
                    <>
                      <h2>
                        Things to do in{" "}
                        <span className="text-capitalize">
                          {cities.city_name}
                        </span>
                      </h2>
                      <div className="row">
                        {categories.map((category, index) => {
                          return (
                            <div
                              className="col-md-12 col-lg-6 col-xl-6 category-data"
                              key={index}
                            >
                              <Paper
                                elevation={5}
                                style={{
                                  borderRadius: 0,
                                }}
                                className="my-2"
                              >
                                <div className="row">
                                  <div className="col-md-3 col-lg-4 col-xl-3 category-image-container">
                                    <div
                                      className="category-image"
                                      style={{
                                        backgroundImage: `url(${process.env
                                          .REACT_APP_IMAGEURL +
                                          "/category_images/" +
                                          category.category_image})`,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="col-md-9 col-lg-8 col-xl-9 my-3 category-details">
                                    <h4
                                      className="text-uppercase"
                                      style={{ fontFamily: "Montserrat" }}
                                    >
                                      {category.category_name}
                                    </h4>
                                    <p className="category-detail">
                                      {category.details}
                                    </p>
                                  </div>
                                </div>
                              </Paper>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
      </div>
    );
  }
}
