import React, { Component } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  CardActionArea,
  CardActions,
  CardMedia,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Loader } from "../services";
import "../assets/css/home.css";
import SliderContainer from "../containers/SliderContainer";

const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
  },
};

export default withStyles(styles)(
  class Home extends Component {
    render() {
      const { classes } = this.props;
      const { isLoading, cities, cityCategories, cityImages } = this.props;
      return (
        <div>
          {isLoading ? (
            Loader(isLoading)
          ) : (
            <div className="home-page">
              <SliderContainer />
              <div className="container">
              <h1>This is home page</h1>
                <div className="row mt-5">
                  {cities.map((city, index) => {
                    return (
                      <div className="col-md-4 mt-3" key={index}>
                        <Card style={{ borderRadius: 0 }}>
                          <CardActionArea>
                            {cityImages
                              .filter(image => city.id === image.city_id)
                              .map((image, index) => (
                                <CardMedia
                                  component="img"
                                  alt={city.city_name}
                                  className={classes.media}
                                  height="250px"
                                  image={
                                    `${process.env.REACT_APP_IMAGEURL}/cover_images/` +
                                    image.cover_image
                                  }
                                  title={city.city_name}
                                  key={index}
                                />
                              ))}
                            {/* <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {`${city.city_name}, ${city.country}`}
                            </Typography>
                            <Typography component="p">
                              {city.description}
                            </Typography>
                            {cityCategories
                              .filter(category => city.id === category.city_id)
                              .map((city, index) => (
                                <span key={index}>
                                  {`${city.category_name}${index ? "" : ", "}`}{" "}
                                </span>
                              ))}
                          </CardContent> */}
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary">
                              Learn More
                            </Button>
                          </CardActions>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
);
