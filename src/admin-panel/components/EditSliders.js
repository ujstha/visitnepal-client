import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input, Radio } from "antd";

export default class EditSliders extends Component {
  render() {
    const {
      caption,
      link,
      status,
      slides,
      image_name,
      onChange,
      handleImage,
      captionValue,
      linkValue,
      statusValue,
      imageValue,
      onSubmit,
      btnDisabled,
      isFetching
    } = this.props;

    return (
      <div>
        <div className="text-center mb-3">
          <h2 className="m-0">Edit Slide</h2>
          <span></span>
        </div>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <Form.Item>
            <Input
              placeholder="Caption *"
              type="text"
              name={caption}
              value={captionValue}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="text"
              name={link}
              value={linkValue}
              onChange={onChange}
              placeholder="Link *"
            />
          </Form.Item>
          <Form.Item>
            <Radio.Group name={status} onChange={onChange} defaultValue={statusValue}>
              <Radio value="active" checked={statusValue === "active"}>Active</Radio>
              <Radio value="inactive" checked={statusValue === "inactive"}>Inactive</Radio>
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
          {imageValue && (
            <img
              alt={imageValue.name}
              src={
                `${process.env.REACT_APP_IMAGEURL}/slider_images/` + imageValue
              }
              height="80"
              width="auto"
              className="mt-2 float-right"
            />
          )}
          <Form.Item>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={btnDisabled}
              fullWidth
              className="mt-3"
            >
              {isFetching ? <Icon type="sync" spin /> : <span><i className="fa fa-edit"></i> &nbsp; Edit this slide</span>}
            </Button>
          </Form.Item>
        </form>
      </div>
    );
  }
}
