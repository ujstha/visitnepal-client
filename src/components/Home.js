import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Loader } from "../services";
import SliderContainer from "../containers/SliderContainer";
import City from "./City";
import "../assets/css/home.css";
import MostViewedCity from "./MostViewedCity";

const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
  },
};

export default withStyles(styles)(
  class Home extends Component {
    render() {
      const {
        isLoading,
        cities,
        classes,
      } = this.props;
      return (
        <div>
          {isLoading ? (
            Loader(isLoading)
          ) : (
            <div className="home-page">
              <SliderContainer />
              <div className="container-fluid my-5">
                <City
                  className={classes.media}
                  cities={cities}
                />
                <MostViewedCity
                  className={classes.media}
                  cities={cities}
                />
              </div>
            </div>
          )}
        </div>
      );
    }
  }
);
