import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";

export default class AddPlaces extends Component {
  render() {
    const {
      place,
      cityName,
      country,
      category,
      description,
      cover_image,
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
          <h2 className="m-0">Add New Places</h2>
          <span></span>
        </div>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <Form.Item>
            <Input
              placeholder="Place Name *"
              type="text"
              name={place}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="text"
              name={cityName}
              onChange={onChange}
              placeholder="City Name *"
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Country *"
              type="text"
              name={country}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Category *"
              type="text"
              name={category}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              placeholder="Description *"
              type="text"
              name={description}
              onChange={onChange}
              rows={4}
            />
          </Form.Item>
          <label htmlFor="file-upload" className="file-upload-button mt-2 mb-0">
            <div className="file-name">
              <i className="fas fa-upload fa-fw text-dark"></i> &nbsp; {image_name}
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            className="rounded-0"
            accept="image/*"
            name={cover_image}
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
              {isFetching ? <Icon type="sync" spin /> : <span><i className="fa fa-save"></i> &nbsp; Save this place</span>}
            </Button>
          </Form.Item>
        </form>
      </div>
    );
  }
}
