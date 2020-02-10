import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Button } from "@material-ui/core";

export default class City extends Component {
  render() {
    const { cities, className } = this.props;
    return (
      <>
        {cities.city.length !== 0 && (
          <div className="mt-2">
            <div className="text-left">
              <Link to="/cities" className="clearfix home-header">
                <span className="text-dark" style={{ fontSize: 28 }}>
                  Popular Destinations
                </span>
              </Link>
            </div>
            <div className="row">
              {cities.city.map((city, index) => {
                return (
                  index < 4 && (
                    <div
                      className="col-md-6 col-lg-4 col-xl-3 mt-3"
                      key={index}
                    >
                      <Link to={`/city/${city.id}`}>
                        <Card style={{ borderRadius: 0 }} elevation={5}>
                          <CardContent>
                            {cities.city_image
                              .filter(image => city.id === image.city_id)
                              .map((image, index) => (
                                <CardMedia
                                  component="img"
                                  alt={city.city_name}
                                  className={className}
                                  height="200px"
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
                                size="small"
                                color="primary"
                                variant="contained"
                                style={{ borderRadius: 0, marginTop: 10 }}
                              >
                                Read More 
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
}
