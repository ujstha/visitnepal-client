import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Toast, SlidesFunction } from "../../services";
import { Paper, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddSliders from "../components/AddSliders";

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
  class AddSlidersContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        caption: "",
        status: "",
        link: "",
        slides: "",
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
        slides: e.target.files[0]
      });
    };
    onSubmit = e => {
      e.preventDefault();
      this.setState({
        isFetching: true
      });
      const formData = new FormData();
      formData.append("caption", this.state.caption);
      formData.append("link", this.state.link);
      formData.append("slides", this.state.slides);
      formData.append("status", this.state.status);

      SlidesFunction(formData)
        .then(res => {
          this.setState({
            isFetching: false,
            showAlert: true,
            alertColor: "success",
            message: res.data.message
          });
          document.location.href = "/manage/slides";
        })
        .catch(err => console.log(err.response));
    };

    render() {
      const {
        caption,
        link,
        status,
        slides,
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
              <title>Add New Slides | VisitNepal</title>
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
                <AddSliders
                  caption="caption"
                  link="link"
                  status="status"
                  slides="slides"
                  image_name={slides ? slides.name : "Upload an Image...."}
                  handleImage={this.handleImageChange}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  isFetching={isFetching}
                  btnDisabled={
                    caption === "" || link === "" || status === ""
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
