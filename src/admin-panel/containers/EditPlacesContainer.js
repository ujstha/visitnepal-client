import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Toast, EditCityImage, GetCityById, EditCities } from "../../services";
import { Paper, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EditPlaces from "../components/EditPlaces";

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
  class EditPlacesContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        place: "",
        city_name: "",
        category: [],
        categoryValue: "",
        country: "",
        description: "",
        cover_image: "",
        showAlert: false,
        message: "",
        alertColor: "",
        isFetching: null,
        imageID: null
      };
    }
    componentDidMount() {
      const ID = this.props.match.params.id;
      GetCityById(ID).then(res => {
        this.setState({
          place: res.cityById.place,
          city_name: res.cityById.city_name,
          categoryValue: res.cityById.category,
          country: res.cityById.country,
          description: res.cityById.description,
          cover_image: res.cityImageByCityId.map(CI => CI.cover_image),
          imageID: res.cityImageByCityId.map(CI => CI.id)
        });
      });
    }
    onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    handleOption = value => {
      this.setState({
        country: value
      });
    };
    handleMultiple = value => {
      this.setState({
        category: value
      });
    };
    handleImageChange = e => {
      this.setState({
        cover_image: e.target.files[0]
      });
    };
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

      EditCities(this.props.match.params.id, citiesData).then(res => {
        this.setState({
          isFetching: false,
          showAlert: true,
          alertColor: "success",
          message: res.data.message
        });
        const formData = new FormData();
        formData.append("cover_image", this.state.cover_image);
        EditCityImage(
          this.props.match.params.id,
          this.state.imageID,
          formData
        ).then(imageRes => {
          console.log("Upload Success.");
          document.location.href = "/manage/places";
        });
      });
    };

    render() {
      const {
        place,
        city_name,
        country,
        category,
        categoryValue,
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
              <title>Edit details of {place} | VisitNepal</title>
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
                <EditPlaces
                  place="place"
                  placeValue={place}
                  cityName="city_name"
                  cityValue={city_name}
                  country="country"
                  countryValue={country}
                  categoryValue={categoryValue}
                  description="description"
                  descriptionValue={description}
                  cover_image="cover_image"
                  image_name={
                    cover_image && cover_image.name
                      ? cover_image.name
                      : cover_image
                  }
                  imageValue={cover_image}
                  handleImage={this.handleImageChange}
                  handleMultiple={this.handleMultiple}
                  handleOption={this.handleOption}
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
