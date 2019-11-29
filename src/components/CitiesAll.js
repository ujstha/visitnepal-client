import React, { Component } from "react";
import { Card, CardContent, CardMedia, Button } from "@material-ui/core";
import "../assets/css/home.css";

const card = (cityImages, city, className, height) => (
  <Card style={{ borderRadius: 0 }} elevation={20} key={city.id}>
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
    const { cities, cityImages, className } = this.props;
    return (
      <>
        {cities.length !== 0 ? (
          <div className="pt-4 home-page container-fluid">
            <h1 className="text-center">Places to visit in Nepal</h1>
            <div className="row">
              {cities.map((city, index) => {
                return (
                  <div className="col-md-6 col-lg-4 col-xl-4 mt-3" key={index}>
                    {card(cityImages, city, className, "250px")}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h1 className="text-center mt-4">Oops.... Looks like city's list is empty</h1>
        )}
      </>
    );
  }
}
