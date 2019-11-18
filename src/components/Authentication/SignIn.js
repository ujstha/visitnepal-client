import React, { Component } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rememberme: false,
    };
  }
  handleChange = () => {
    this.setState({
      rememberme: !this.state.rememberme,
    });
  };
  render() {
    sessionStorage.setItem("rememberme", this.state.rememberme);
    const { identity, password, onChange, onSubmit } = this.props;
    return (
      <div className="form-container sign-in-container">
        <form onSubmit={onSubmit}>
          <h1>Sign In</h1>
          <span>use your account</span>
          <br />
          <input
            type="text"
            name={identity}
            onChange={onChange}
            placeholder="Email or Username"
          />
          <input
            type="password"
            name={password}
            onChange={onChange}
            placeholder="Password"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.rememberme}
                onChange={this.handleChange}
                value="rememberme"
              />
            }
            label="Remember Me"
          />
          <a href={"!"}>Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}
