import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input, Radio } from "antd";

export default class AddSliders extends Component {
  render() {
    const {
      caption,
      link,
      status,
      slides,
      image_name,
      onChange,
      handleImage,
      onSubmit,
      btnDisabled,
      isFetching
    } = this.props;

    return (
      <div>
        <div className="text-center mb-3">
          <h2 className="m-0">Add New Slide</h2>
          <span></span>
        </div>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <Form.Item>
            <Input
              type="text"
              name={caption}
              onChange={onChange}
              placeholder="Caption *"
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Link (URL) *"
              type="url"
              name={link}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Radio.Group
              name={status}
              onChange={onChange}
            >
              <Radio value="active">Active</Radio>
              <Radio value="inactive">Inactive</Radio>
            </Radio.Group>
          </Form.Item>
          <label htmlFor="file-upload" className="file-upload-button mt-2 mb-0">
            <div className="file-name">
              <i className="fas fa-upload fa-fw text-dark"></i> &nbsp;{" "}
              {image_name}
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            className="rounded-0"
            accept="image/*"
            name={slides}
            onChange={handleImage}
          />
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
                  <i className="fa fa-save"></i> &nbsp; Save this slide
                </span>
              )}
            </Button>
          </Form.Item>
        </form>
      </div>
    );
  }
}
