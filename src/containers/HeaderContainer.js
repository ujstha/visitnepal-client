import React, { Component } from "react";
import Header from "../components/Header";
import { GetUser } from "../services";

export default class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }
  componentDidMount() {
    GetUser().then(res => {
      if (!res.data.status) {
        this.setState({
          username: res.data.user.username,
        });
      }
    });
  }
  render() {
    const { username } = this.state;
    return <Header username={username} />;
  }
}
