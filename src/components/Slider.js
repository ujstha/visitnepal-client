import React, { Component } from "react";
import { Carousel, Icon } from "antd";
import { CircularLoader } from "../services";
import "../assets/css/slider.css";

export default class Slider extends Component {
  render() {
    const { isLoading, carousel, next, prev, images } = this.props;
    return (
      <div className="carousel-container">
        <Icon type="left" onClick={prev} />
        <Carousel
          ref={carousel}
          autoplay
          autoplaySpeed={5000}
          draggable={true}
          pauseOnHover={true}
          adaptiveHeight={true}
        >
          {isLoading
            ? CircularLoader(isLoading)
            : images.map((image, index) => (
                <img
                  src={
                    `${process.env.REACT_APP_IMAGEURL}/slider_images/` +
                    image.slides
                  }
                  alt={image.caption}
                  key={index}
                />
              ))}
        </Carousel>
        <Icon type="right" onClick={next} />
      </div>
    );
  }
}
