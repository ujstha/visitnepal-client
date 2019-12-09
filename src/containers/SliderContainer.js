import React, { Component } from "react";
import Slider from "../components/Slider";
import axios from "axios";

export default class SliderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      images: [],
    };
    this.carousel = React.createRef();
  }
  next = () => {
    this.carousel.next();
  };
  previous = () => {
    this.carousel.prev();
  };
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASEURL}/slider`).then(res => {
      this.setState({ images: res.data });
    });
  }
  render() {
    const { isLoading, images } = this.state;
    return (
      <Slider
        carousel={node => (this.carousel = node)}
        prev={this.previous}
        next={this.next}
        isLoading={isLoading}
        images={images}
      />
    );
  }
}
