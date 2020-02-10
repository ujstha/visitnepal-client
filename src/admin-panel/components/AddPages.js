import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";

export default class AddSliders extends Component {
  render() {
    const {
      title,
      body,
      onChange,
      onSubmit,
      btnDisabled,
      isFetching
    } = this.props;

    return (
      <div>
        <div className="text-center mb-3">
          <h2 className="m-0">Add New Page</h2>
          <span></span>
        </div>
        <form onSubmit={onSubmit}>
          <Form.Item>
            <Input
              type="text"
              name={title}
              onChange={onChange}
              placeholder="Title of the page *"
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              rows={4}
              placeholder="Body of the page"
              type="text"
              name={body}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={btnDisabled}
              fullWidth
              className="mt-3"
            >
              {isFetching ? (
                <Icon type="sync" spin />
              ) : (
                <span>
                  <i className="fa fa-save"></i> &nbsp; Save this page
                </span>
              )}
            </Button>
          </Form.Item>
        </form>
      </div>
    );
  }
}
