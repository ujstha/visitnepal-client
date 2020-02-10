import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input, Select } from "antd";
import countries from "../../coutries";
import categories from "../../categories";

export default class EditPlaces extends Component {
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
      placeValue,
      cityValue,
      countryValue,
      categoryValue,
      descriptionValue,
      imageValue,
      onSubmit,
      btnDisabled,
      isFetching
    } = this.props;

    return (
      <div>
        <div className="text-center mb-3">
          <h2 className="m-0">Edit Details of {placeValue}</h2>
          <span></span>
        </div>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <Form.Item>
            <Input
              placeholder="Place Name *"
              type="text"
              name={place}
              value={placeValue}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="text"
              name={cityName}
              value={cityValue}
              onChange={onChange}
              placeholder="City Name *"
            />
          </Form.Item>
          <Form.Item>
            {countryValue && (
              <Select
                placeholder="Select Country"
                onChange={value => handleOption(value)}
                defaultValue={[`${countryValue}`]}
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
            )}
          </Form.Item>
          <Form.Item>
            {categoryValue && (
              <Select
                mode="multiple"
                placeholder="Select Category"
                defaultValue={categoryValue.split(", ")}
                onChange={value => {
                  handleMultiple(value);
                  console.log(value);
                }}
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
            )}
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Description *"
              type="text"
              name={description}
              value={descriptionValue}
              onChange={onChange}
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
          {imageValue && (
            <img
              alt={imageValue.name}
              src={
                `${process.env.REACT_APP_IMAGEURL}/cover_images/` + imageValue
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
              {isFetching ? (
                <Icon type="sync" spin />
              ) : (
                <span>
                  <i className="fa fa-edit"></i> &nbsp; Edit this place
                </span>
              )}
            </Button>
          </Form.Item>
        </form>
      </div>
    );
  }
}
