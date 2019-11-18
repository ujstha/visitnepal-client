import React from "react";

export default class SignUp extends React.Component {
  render() {
    const {
      username,
      email,
      password,
      password_confirmation,
      onSubmit,
      onChange,
    } = this.props;
    return (
      <div className="form-container sign-up-container">
        <form onSubmit={onSubmit}>
          <h1>Create Account</h1>
          <span>use your email for registration</span>
          <br />
          <input
            type="text"
            name={username}
            onChange={onChange}
            placeholder="Username"
          />
          <input
            type="email"
            name={email}
            onChange={onChange}
            placeholder="Email"
          />
          <input
            type="password"
            name={password}
            onChange={onChange}
            placeholder="Password"
          />
          <input
            type="password"
            name={password_confirmation}
            onChange={onChange}
            placeholder="Confirm Password"
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
