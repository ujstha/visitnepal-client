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
import axios from "axios";
import a from "../assets/img/a.jpg";
import b from "../assets/img/b.jpg";
import c from "../assets/img/c.jpg";
import d from "../assets/img/d.jpg";
import { Loader } from "../services/Loader";

const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
  },
};

export default withStyles(styles)(
  class Home extends Component {
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
      axios
        .all([
          axios.get(`${process.env.REACT_APP_BASEURL}/cities`),
          axios.get(`${process.env.REACT_APP_BASEURL}/categories/all`),
          axios.get(`${process.env.REACT_APP_BASEURL}/city/images/all`),
        ])
        .then(
          axios.spread((cities, categories, images) => {
            this.setState({
              cities: cities.data.data,
              cityCategories: categories.data,
              cityImages: images.data,
            });
          })
        )
        .then(res => {
          this.setState({
            isLoading: false,
          });
        });
    }

    render() {
      const { classes } = this.props;
      const { isLoading, cities, cityCategories, cityImages } = this.state;
      return (
        <div>
          {isLoading ? (
            Loader(isLoading)
          ) : (
            <div className="home-page">
              <h1>This is home page</h1>

              <div className="row">
                {cities.map((city, index) => {
                  return (
                    <div className="col-md-3" key={index}>
                      <Card style={{ borderRadius: 0 }}>
                        <CardActionArea>
                          {cityImages
                            .filter(image => city.id === image.city_id)
                            .map((image, index) => (
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                className={classes.media}
                                height="280px"
                                image={
                                  `http://visitnepal-server.local/storage/cover_images/` +
                                  image.cover_image
                                }
                                title="Contemplative Reptile"
                                key={index}
                              />
                            ))}
                          <CardContent>
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
                          </CardContent>
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
          )}
        </div>
      );
    }
  }
);
