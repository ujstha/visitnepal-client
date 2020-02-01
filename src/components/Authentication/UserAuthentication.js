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
        userExist: null,
        emailExist: null,
        userError: "",
        emailError: "",
        userValidating: false,
        emailValidating: false,
        isFetching: null
      };
    }
    showForm = () => {
      this.setState({
        signUp: !this.state.signUp
      });
    };
    onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    onBlur = e => {
      e.preventDefault();
      const { username, email } = this.state;
      let signUpData = {
        username: username,
        email: email
      };

      UserFunction("register", signUpData).catch(err => {
        if (err.response.data.errors.username) {
          this.setState({
            userExist: true,
            userValidating: false
          });
        } else {
          this.setState({
            userExist: false,
            userValidating: false
          });
        }
        if (err.response.data.errors.email) {
          this.setState({
            emailExist: true,
            emailValidating: false
          });
        } else {
          this.setState({
            emailExist: false,
            emailValidating: false
          });
        }
        this.setState({
          userError: err.response.data.errors.username,
          emailError: err.response.data.errors.email
        });
      });
    };
    onUserInput = () => {
      this.setState({
        userValidating: true
      });
    };
    onEmailInput = () => {
      this.setState({
        emailValidating: true
      });
    };
    authenticate = e => {
      e.preventDefault();
      this.setState({
        isFetching: true
      });
      const {
        identity,
        username,
        email,
        password,
        password_confirmation,
        signUp
      } = this.state;

      let signInData = {
        identity: identity,
        password: password
      };
      let signUpData = {
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation
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
          this.setState({
            isFetching: false
          });
        })
        .catch(err => {
          if (!signUp) {
            return this.setState({
              showAlert: true,
              errorMessage: err.response.data.error,
              alertColor: "danger",
              isFetching: false
            });
          } else {
            this.setState({
              showAlert: true,
              errorMessage: err.response.data.message,
              alertColor: "danger",
              isFetching: false
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
        userExist,
        emailExist,
        userError,
        emailError,
        userValidating,
        emailValidating,
        isFetching
      } = this.state;
      const { classes } = this.props;

      return (
        <>
          <main className={classes.main}>
            <Helmet>
              <title>{signUp ? "Sign Up Page" : "Sign In Page"}</title>
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
                    onBlur={this.onBlur}
                    onUserInput={this.onUserInput}
                    onEmailInput={this.onEmailInput}
                    userExist={
                      userValidating
                        ? "validating"
                        : userExist
                        ? "error"
                        : !userExist && userExist !== null
                        ? "success"
                        : ""
                    }
                    userExistMsg={
                      userExist
                        ? userError
                        : !userExist && userExist !== null
                        ? "Username is available."
                        : ""
                    }
                    emailExist={
                      emailValidating
                        ? "validating"
                        : emailExist
                        ? "error"
                        : !emailExist && emailExist !== null
                        ? "success"
                        : ""
                    }
                    emailExistMsg={
                      emailExist
                        ? emailError
                        : !emailExist && emailExist !== null
                        ? "Email is available."
                        : ""
                    }
                    isFetching={
                      isFetching && isFetching !== null ? true : false
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
                    isFetching={
                      isFetching && isFetching !== null ? true : false
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
        </>
      );
    }
  }
);
