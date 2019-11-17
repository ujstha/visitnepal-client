import React from "react";

export default class SignIn extends React.Component {
  render() {
    const { identity, password, onChange, onSubmit } = this.props;
    return (
      <div className="form-container sign-in-container">
        <form onSubmit={onSubmit}>
          <h1>Sign in</h1>
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
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}
