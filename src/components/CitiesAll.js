import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import "../assets/css/home.css";
import { CircularLoader } from "../services";
import { Empty } from "antd";

const card = (cityImages, city, className, height) => (
  <Card style={{ borderRadius: 0 }} elevation={10} key={city.id}>
    <CardContent>
      {cityImages
        .filter(image => city.id === image.city_id)
        .map((image, index) => (
          <div key={index} style={{ height: height, overflow: "hidden" }}>
            <CardMedia
              component="img"
              alt={city.city_name}
              className={className}
              height={height}
              image={
                `${process.env.REACT_APP_IMAGEURL}/cover_images/` +
                image.cover_image
              }
              title={city.city_name}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      <div className="p-3">
        <Typography
          className="clearfix"
          gutterBottom
          variant="h5"
          component="h2"
        >
          <span className="float-left">{city.place}</span>
          <span className="float-right text-secondary" style={{ fontSize: 12 }}>
            &nbsp; &nbsp;<i className="fa fa-star"></i>&nbsp;
            {city.rating_count}
          </span>
          <span className="float-right text-secondary" style={{ fontSize: 12 }}>
            <i className="fa fa-comments"></i>&nbsp;{city.comment_count}
          </span>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="cities-description"
          component="p"
        >
          {city.description}
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export default class CitiesAll extends Component {
  render() {
    const { cities, cityImages, className, isLoading } = this.props;
    return (
      <>
        <Helmet>
          <title>Cities - Destinations to visit in Nepal | VisitNepal</title>
        </Helmet>
        {isLoading ? (
          CircularLoader(isLoading)
        ) : cities && cities.length !== 0 ? (
          <div className="home-page">
            <div className="MuiPaper-root text-left bg-secondary text-light p-2">
              <div
                className="container-fluid clearfix"
                style={{ fontSize: 18 }}
              >
                <span className="float-left">
                  Destinations in Nepal
                </span>
                <span className="float-right" style={{ fontSize: 15 }}>
                  <a className="text-light" href="/">
                    Home
                  </a>{" "}
                  / <span className="text-warning">Cities</span>
                </span>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                {cities.map((city, index) => {
                  return (
                    <div
                      className="col-md-6 col-sm-6 col-lg-4 col-xl-4 mt-4"
                      key={index}
                    >
                      <Link to={`/city/${city.id}`}>
                        {card(cityImages, city, className, "220px")}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Empty
              description="Oops.... Looks like city's list is empty."
              style={{ fontSize: 60 }}
            />
          </div>
        )}
      </>
    );
  }
}
