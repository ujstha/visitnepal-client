import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input, Select } from "antd";
import countries from "../../coutries";
import categories from "../../categories";

export default class AddPlaces extends Component {
  render() {
    const {
      place,
      cityName,
      description,
      cover_image,
      image_name,
      onChange,
      handleImage,
      handleOption,
      handleMultiple,
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
            <Select
              placeholder="Select Country"
              onChange={value => handleOption(value)}
              defaultValue="Nepal"
            >
              {countries && countries.length !== 0 ? (
                countries.map((country, index) => (
                  <Select.Option value={country.name} key={index}>
                    {country.name}
                  </Select.Option>
                ))
              ) : (
                <Select.Option value="Nepal">Nepal</Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              mode="multiple"
              placeholder="Select Category"
              onChange={value => handleMultiple(value)}
            >
              <Select.OptGroup label="Adventurous">
                {categories.adventure.map((category, index) => (
                  <Select.Option value={category} key={index}>
                    {category}
                  </Select.Option>
                ))}
              </Select.OptGroup>
              <Select.OptGroup label="Other">
                {categories.other.map((category, index) => (
                  <Select.Option value={category} key={index}>
                    {category}
                  </Select.Option>
                ))}
              </Select.OptGroup>
            </Select>
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
              <i className="fas fa-upload fa-fw text-dark"></i> &nbsp;{" "}
              {image_name}
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
              {isFetching ? (
                <Icon type="sync" spin />
              ) : (
                <span>
                  <i className="fa fa-save"></i> &nbsp; Save this place
                </span>
              )}
            </Button>
          </Form.Item>
        </form>
      </div>
    );
  }
}
