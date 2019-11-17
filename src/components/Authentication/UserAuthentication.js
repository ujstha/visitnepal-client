import React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { UserFunction } from "../services/UserFunction";

export default class UserAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      identity: "",
      password: "",
      username: "",
      email: "",
      password_confirmation: "",
    };
  }
  showForm = () => {
    this.setState({
      signUp: !this.state.signUp,
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
    );
  };
  render() {
    const { signUp } = this.state;
    return (
      <div
        className={`register-container ${signUp ? "right-panel-active" : ""}`}
      >
        <SignUp
          onSubmit={this.authenticate}
          username="username"
          email="email"
          password="password"
          password_confirmation="password_confirmation"
          onChange={this.onChange}
        />
        <SignIn
          onSubmit={this.authenticate}
          identity="identity"
          password="password"
          onChange={this.onChange}
        />

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={this.showForm}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={this.showForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
