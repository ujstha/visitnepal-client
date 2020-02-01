import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Toast, ResetPassword, GetUser } from "../../services";
import { Paper, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "../../assets/css/registration.css";
import AdminSettings from "../components/AdminSettings";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  }
});

export default withStyles(styles)(
  class AdminSettingsContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        password_confirmation: "",
        showAlert: false,
        errorMessage: "",
        alertColor: "",
        isFetching: null
      };
    }
    componentDidMount() {
      GetUser().then(res =>
        this.setState({
          email: res.data.user.email
        })
      );
    }
    onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    updatePassword = e => {
      e.preventDefault();
      this.setState({
        isFetching: true
      });
      const { password, password_confirmation } = this.state;

      let passData = {
        password: password,
        password_confirmation: password_confirmation
      };

      ResetPassword("ujwals@email.com", passData)
        .then(res => {
          this.setState({
            showAlert: true,
            errorMessage: res.data.message,
            alertColor: "success",
            isFetching: false
          });
          console.log(res);
        })
        .catch(err => {
          this.setState({
            showAlert: true,
            errorMessage: err.response.data.message,
            alertColor: "danger",
            isFetching: false
          });
        });
    };

    render() {
      const {
        email,
        showAlert,
        alertColor,
        errorMessage,
        password,
        password_confirmation,
        isFetching
      } = this.state;
      const { classes } = this.props;

      return (
        <>
          <main className={classes.main}>
            <Helmet>
              <title>Reset Password</title>
            </Helmet>
            <CssBaseline />
            <Paper elevation={6} className={classes.paper}>
              {Toast(
                alertColor === "" ? "danger" : alertColor,
                errorMessage,
                showAlert,
                () => {
                  this.setState({ showAlert: false });
                },
                "countdown"
              )}
              <div className="register-container">
                <AdminSettings
                  email={email}
                  onSubmit={this.updatePassword}
                  password="password"
                  password_confirmation="password_confirmation"
                  onChange={this.onChange}
                  btnDisabled={
                    password === "" ||
                    password_confirmation === "" ||
                    password !== password_confirmation
                      ? true
                      : false
                  }
                  passMatch={password !== password_confirmation ? "error" : ""}
                  passMatchMsg={
                    password !== password_confirmation
                      ? "Above passwords must match."
                      : ""
                  }
                  isFetching={isFetching && isFetching !== null ? true : false}
                />
              </div>
            </Paper>
          </main>
        </>
      );
    }
  }
);
