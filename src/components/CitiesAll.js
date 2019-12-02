import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Button } from "@material-ui/core";
import { Helmet } from "react-helmet";
import "../assets/css/home.css";
import { CircularLoader } from "../services";

const card = (cityImages, city, className, height) => (
  <Card style={{ borderRadius: 0 }} elevation={10} key={city.id}>
    <CardContent>
      {cityImages
        .filter(image => city.id === image.city_id)
        .map((image, index) => (
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
            key={index}
          />
        ))}
      <div className="card-overlay">
        <h4>{city.city_name}</h4>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          style={{ borderRadius: 0, marginTop: 10 }}
        >
          Read More
        </Button>
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
          <title>Cities - Places to visit in Nepal | VisitNepal</title>
        </Helmet>
        {isLoading ? (
          CircularLoader(isLoading)
        ) : cities && cities.length !== 0 ? (
          <div className="py-4 home-page container-fluid">
            <h1 className="MuiPaper-root MuiPaper-elevation15 text-center bg-dark text-light p-2">
              Places to visit in Nepal
            </h1>
            <div className="row">
              {cities.map((city, index) => {
                return (
                  <div className="col-md-6 col-lg-4 col-xl-4 mt-4" key={index}>
                    <Link to={`/city/${city.id}`}>
                      {card(cityImages, city, className, "250px")}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h1 className="text-center mt-4">
            Oops.... Looks like city's list is empty.
          </h1>
        )}
      </>
    );
  }
}
