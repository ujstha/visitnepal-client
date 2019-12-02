import React, { Component } from "react";
import { FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";
import { SimpleLoader } from "../../services";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreement: false,
    };
  }
  handleChange = () => {
    this.setState({
      agreement: !this.state.agreement,
    });
  };
  render() {
    const {
      username,
      email,
      password,
      password_confirmation,
      onSubmit,
      onChange,
      className,
      btnDisabled,
      passMatch,
      passMatchMsg,
      onBlur,
      userExist,
      userExistMsg,
      emailExist,
      emailExistMsg,
      onUserInput,
      onEmailInput,
      isFetching,
    } = this.props;
    const { agreement } = this.state;
    sessionStorage.setItem("agreement", agreement);

    return (
      <div className={className}>
        <div className="text-center mb-3">
          <h2 className="m-0">Sign Up</h2>
          <span>use your email for registration</span>
        </div>
        <Form onSubmit={onSubmit}>
          <Form.Item validateStatus={userExist} help={userExistMsg} hasFeedback>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username *"
              type="text"
              name={username}
              onChange={onChange}
              required={true}
              onBlur={onBlur}
              onInput={onUserInput}
            />
          </Form.Item>
          <Form.Item
            validateStatus={emailExist}
            help={emailExistMsg}
            hasFeedback
          >
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email *"
              type="email"
              name={email}
              onChange={onChange}
              required={true}
              onBlur={onBlur}
              onInput={onEmailInput}
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
              required={true}
            />
          </Form.Item>
          <Form.Item validateStatus={passMatch} help={passMatchMsg} hasFeedback>
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              name={password_confirmation}
              onChange={onChange}
              placeholder="Confirm Password *"
              style={{ borderRadius: 0 }}
              visibilityToggle={true}
              required={true}
            />
          </Form.Item>
          <Form.Item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreement}
                  onChange={this.handleChange}
                  value="agreement"
                />
              }
              label="I have read the agreement"
              className="agreement"
            />
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              style={{ borderRadius: 0 }}
              disabled={!agreement || btnDisabled ? true : false}
            >
              {isFetching ? SimpleLoader() : "Sign Up"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
