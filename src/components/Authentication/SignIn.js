import React, { Component } from "react";
import { FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";

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
    const { rememberme } = this.state;
    const {
      identity,
      password,
      onChange,
      onSubmit,
      className,
      btnDisabled,
    } = this.props;
    sessionStorage.setItem("rememberme", rememberme);

    return (
      <div className={className}>
        <div className="text-center mb-3">
          <h2 className="m-0">Sign In</h2>
          <span>use your account</span>
        </div>
        <Form onSubmit={onSubmit}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email or Username *"
              type="text"
              name={identity}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              name={password}
              onChange={onChange}
              placeholder="Password *"
              style={{ borderRadius: 0 }}
              visibilityToggle={true}
            />
          </Form.Item>
          <Form.Item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberme}
                  onChange={this.handleChange}
                  value="rememberme"
                />
              }
              label="Remember Me"
            />
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              style={{ borderRadius: 0 }}
              disabled={btnDisabled}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
