import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Toast, GetSlideById, EditSlides } from "../../services";
import { Paper, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EditSliders from "../components/EditSliders";

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
  class EditSlidersContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        caption: "",
        link: "",
        slides: "",
        status: "",
        showAlert: false,
        message: "",
        alertColor: "",
        isFetching: null
      };
    }
    componentDidMount() {
      const ID = this.props.match.params.id;
      GetSlideById(ID).then(res => {
        this.setState({
          caption: res.sliderById.caption,
          link: res.sliderById.link,
          status: res.sliderById.status,
          slides: res.sliderById.slides
        });
      });
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
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

      EditSlides(this.props.match.params.id, formData)
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
        slides,
        status,
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
              <title>Edit Slide | VisitNepal</title>
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
                <EditSliders
                  caption="caption"
                  captionValue={caption}
                  link="link"
                  linkValue={link}
                  status="status"
                  statusValue={status}
                  slides="slides"
                  image_name={slides && slides.name ? slides.name : slides}
                  imageValue={slides}
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
