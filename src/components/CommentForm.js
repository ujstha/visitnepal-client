import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";

export default class CommentForm extends Component {
  render() {
    const { onSubmit, validateStatus, help, onChange, name } = this.props;
    return (
      <Form onSubmit={onSubmit} className="w-100 mt-3">
        <Form.Item validateStatus={validateStatus} help={help} hasFeedback>
          <Input
            prefix={
              <Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            suffix={
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className="mr-3"
              >
                Comment
              </Button>
            }
            placeholder="Write a review......"
            type="text"
            name={name}
            onChange={onChange}
            size="large"
          />
        </Form.Item>
      </Form>
    );
  }
}
