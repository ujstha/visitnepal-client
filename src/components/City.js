import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Button } from "@material-ui/core";

export default class City extends Component {
  render() {
    const { cities, cityImages, className } = this.props;
    return (
      <>
        {cities.length !== 0 && (
          <div className="mt-2">
            <Link to="/cities">
              <h2 className="text-center">Where to go in Nepal</h2>
            </Link>
            <div className="row">
              {cities.map((city, index) => {
                return (
                  index < 3 && (
                    <div className="col-md-6 col-lg-4 col-xl-4 mt-3" key={index}>
                      <Link to={`/city/${city.id}`}><Card style={{ borderRadius: 0 }} elevation={20}>
                        <CardContent>
                          {cityImages
                            .filter(image => city.id === image.city_id)
                            .map((image, index) => (
                              <CardMedia
                                component="img"
                                alt={city.city_name}
                                className={className}
                                height="260px"
                                image={
                                  `${process.env.REACT_APP_IMAGEURL}/cover_images/` +
                                  image.cover_image
                                }
                                title={city.city_name}
                                key={index}
                              />
                            ))}
                          <div className="card-overlay">
                            <h4>{`${city.city_name}, ${city.country}`}</h4>
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
                      </Card></Link>
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
