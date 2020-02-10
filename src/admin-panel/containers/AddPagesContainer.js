import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Toast, PagesFunction } from "../../services";
import { Paper, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddPages from "../components/AddPages";

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
  class AddPagesContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        body: "",
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
    onSubmit = e => {
      e.preventDefault();
      this.setState({
        isFetching: true
      });
      const { title, body } = this.state;
      let pageData = {
        title: title,
        body: body
      };

      PagesFunction(pageData).then(res => {
        this.setState({
          isFetching: false,
          showAlert: true,
          alertColor: "success",
          message: res.data.message
        });
        document.location.href = "/manage/pages";
      });
    };

    render() {
      const {
        title,
        body,
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
              <title>Add New Pages | VisitNepal</title>
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
                <AddPages
                  title="title"
                  body="body"
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  isFetching={isFetching}
                  btnDisabled={title === "" || body === "" ? true : false}
                />
              </div>
            </Paper>
          </main>
        </>
      );
    }
  }
);
