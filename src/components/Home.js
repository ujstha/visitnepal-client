import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Loader } from "../services";
import SliderContainer from "../containers/SliderContainer";
import Category from "./Category";
import City from "./City";
import "../assets/css/home.css";

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
        cityCategories,
        cityImages,
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
                  cityImages={cityImages}
                />
                <Category
                  className={classes.media}
                  cityCategories={cityCategories}
                />
              </div>
            </div>
          )}
        </div>
      );
    }
  }
);
