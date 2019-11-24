import React, { Component } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Helmet } from "react-helmet";
import { UserFunction, Toast } from "../../services";
import { Paper, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "../../assets/css/registration.css";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
});

export default withStyles(styles)(
  class UserAuthentication extends Component {
    constructor(props) {
      super(props);
      this.state = {
        signUp: false,
        identity: "",
        password: "",
        username: "",
        email: "",
        password_confirmation: "",
        showAlert: false,
        errorMessage: "",
        alertColor: "",
      };
    }
    showForm = () => {
      this.setState({
        signUp: !this.state.signUp,
      });
    };
    onChange = e => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
    authenticate = e => {
      e.preventDefault();
      const {
        identity,
        username,
        email,
        password,
        password_confirmation,
        signUp,
      } = this.state;

      let signInData = {
        identity: identity,
        password: password,
      };
      let signUpData = {
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      };

      UserFunction(
        signUp ? "register" : "login",
        signUp ? signUpData : signInData
      )
        .then(res => {
          if (signUp) {
            return this.setState({
              showAlert: true,
              errorMessage: res.data.message,
              alertColor: "success",
            });
          }
        })
        .catch(err => {
          if (!signUp) {
            return this.setState({
              showAlert: true,
              errorMessage: err.response.data.error,
            });
          } else {
            console.log(err.response);
            this.setState({
              showAlert: true,
              errorMessage: err.response.data.message,
            });
          }
        });
    };

    render() {
      const {
        signUp,
        showAlert,
        alertColor,
        errorMessage,
        identity,
        password,
        username,
        password_confirmation,
        email,
      } = this.state;
      const { classes } = this.props;
      return (
        <React.Fragment>
          <main className={classes.main}>
            <Helmet>
              <title>{signUp ? "Sign Up Page" : "Sign In Page"}</title>
            </Helmet>
            <CssBaseline />
            <Paper
              elevation={6}
              style={{ borderRadius: 0 }}
              className={classes.paper}
            >
              {Toast(
                alertColor === "" ? "danger" : alertColor,
                errorMessage,
                showAlert,
                () => {
                  this.setState({ showAlert: false });
                }
              )}
              <div className="register-container">
                {signUp ? (
                  <SignUp
                    onSubmit={this.authenticate}
                    username="username"
                    email="email"
                    password="password"
                    password_confirmation="password_confirmation"
                    onChange={this.onChange}
                    btnDisabled={
                      username === "" ||
                      email === "" ||
                      password === "" ||
                      password_confirmation === "" ||
                      password !== password_confirmation
                        ? true
                        : false
                    }
                    passMatch={
                      password !== password_confirmation ? "error" : ""
                    }
                    passMatchMsg={
                      password !== password_confirmation
                        ? "Above passwords must match."
                        : ""
                    }
                  />
                ) : (
                  <SignIn
                    onSubmit={this.authenticate}
                    identity="identity"
                    password="password"
                    onChange={this.onChange}
                    validIdentity={identity === "" ? "error" : ""}
                    validPassword={password === "" ? "error" : ""}
                    helpIdentity={identity === "" ? "* Required" : ""}
                    helpPassword={password === "" ? "* Required" : ""}
                    btnDisabled={
                      identity === "" || password === "" ? true : false
                    }
                  />
                )}
                {signUp ? (
                  <div className="text-center my-3" style={{ fontSize: 18 }}>
                    Already have an account?{" "}
                    <span
                      className="text-primary option"
                      onClick={this.showForm}
                    >
                      Sign In
                    </span>
                  </div>
                ) : (
                  <div className="text-center my-3" style={{ fontSize: 18 }}>
                    Don't have an account?{" "}
                    <span
                      className="text-primary option"
                      onClick={this.showForm}
                    >
                      Sign Up
                    </span>
                  </div>
                )}
              </div>
            </Paper>
          </main>
        </React.Fragment>
      );
    }
  }
);
