import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";

export default class EditPage extends Component {
  render() {
    const {
      title,
      body,
      onChange,
      titleValue,
      bodyValue,
      onSubmit,
      btnDisabled,
      isFetching
    } = this.props;

    return (
      <div>
        <div className="text-center mb-3">
          <h2 className="m-0">Edit {titleValue} Page</h2>
          <span></span>
        </div>
        <form onSubmit={onSubmit}>
          <Form.Item>
            <Input
              placeholder="Title of the page *"
              type="text"
              name={title}
              value={titleValue}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              type="text"
              rows={4}
              name={body}
              value={bodyValue}
              onChange={onChange}
              placeholder="Body of the page *"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={btnDisabled}
              fullWidth
              className="mt-3"
            >
              {isFetching ? <Icon type="sync" spin /> : <span><i className="fa fa-edit"></i> &nbsp; Edit this page</span>}
            </Button>
          </Form.Item>
        </form>
      </div>
    );
  }
}
