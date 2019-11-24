import React, { Component } from "react";
import axios from "axios";

export default class slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cap: "",
      link: "",
      slide: null,
      status: "",
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleImageChange = e => {
    this.setState({
      slide: e.target.files[0],
    });
  };
  onsubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", this.state.cap);
    formData.append("link", this.state.link);
    formData.append("slides", this.state.slide);
    formData.append("status", this.state.status);
    axios
      .post(
        `http://visitnepal-server.local/api/update/slide/with_id=4`,
        formData
      )
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onsubmit} encType="multipart/form-data">
          <input
            type="text"
            name="cap"
            placeholder="caption"
            onChange={this.onChange}
            value={this.state.cap}
          />
          <input
            type="text"
            name="link"
            placeholder="link"
            onChange={this.onChange}
            value={this.state.link}
          />
          <input
            type="file"
            name="slide"
            placeholder="slide"
            onChange={this.handleImageChange}
           
          />
          <input
            type="text"
            name="status"
            placeholder="status"
            onChange={this.onChange}
            value={this.state.status}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
