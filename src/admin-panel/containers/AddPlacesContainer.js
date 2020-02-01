import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Toast, CitiesFunction, AddCityImage } from "../../services";
import { Paper, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddPlaces from "../components/AddPlaces";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "block",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  }
});

export default withStyles(styles)(
  class AddPlacesContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        place: "",
        city_name: "",
        category: "",
        country: "",
        description: "",
        cover_image: "",
        showAlert: false,
        message: "",
        alertColor: "",
        isFetching: null
      };
    }
    onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    handleImageChange = e => {
      this.setState({
        cover_image: e.target.files[0]
      })
    }
    onSubmit = e => {
      e.preventDefault();
      this.setState({
        isFetching: true
      });
      const { place, city_name, category, country, description } = this.state;
      let citiesData = {
        place: place,
        city_name: city_name,
        category: category,
        country: country,
        description: description
      };

      CitiesFunction(citiesData).then(res =>
        {
          this.setState({
            isFetching: false,
            showAlert: true,
            alertColor: "success",
            message: res.data.message
          })
          const formData = new FormData();
          formData.append("cover_image", this.state.cover_image);
          AddCityImage(res.data.city_id, formData).then(imageRes => console.log("Upload Success."));
        }
      );
    };

    render() {
      const {
        place,
        city_name,
        country,
        category,
        cover_image,
        description,
        showAlert,
        alertColor,
        message,
        isFetching
      } = this.state;
      const { classes } = this.props;

      return (
        <>
          <main className={classes.main}>
            <Helmet>
              <title>Add New Places | VisitNepal</title>
            </Helmet>
            <CssBaseline />
            <Paper elevation={6} className={classes.paper}>
              {Toast(
                alertColor === "" ? "danger" : alertColor,
                message,
                showAlert,
                () => {
                  this.setState({ showAlert: false });
                },
                "add-place"
              )}
              <div className="add-places-container">
                <AddPlaces
                  place="place"
                  cityName="city_name"
                  country="country"
                  category="category"
                  description="description"
                  cover_image="cover_image"
                  image_name={cover_image ? cover_image.name : "Upload an Image...."}
                  handleImage={this.handleImageChange}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  isFetching={isFetching}
                  btnDisabled={
                    place === "" ||
                    city_name === "" ||
                    country === "" ||
                    category === "" ||
                    description === ""
                      ? true
                      : false
                  }
                />
              </div>
            </Paper>
          </main>
        </>
      );
    }
  }
);
