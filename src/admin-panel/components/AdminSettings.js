import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";

export default class AdminSettings extends Component {
  render() {
    const {
      password,
      email,
      onSubmit,
      onChange,
      className,
      btnDisabled,
      passMatch,
      passMatchMsg,
      password_confirmation,
      isFetching
    } = this.props;

    return (
      <div className={className}>
        <div className="text-center mb-3">
          <h2 className="m-0">Update Password</h2>
          <span>update your password for security</span>
        </div>
        <Form onSubmit={onSubmit}>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email *"
              type="email"
              value={email}
              disabled
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              name={password}
              onChange={onChange}
              placeholder="New Password *"
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
              placeholder="Confirm New Password *"
              style={{ borderRadius: 0 }}
              visibilityToggle={true}
              required={true}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              style={{ borderRadius: 0 }}
              disabled={btnDisabled}
            >
              {isFetching ? <Icon type="sync" spin /> : "Update Password"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
