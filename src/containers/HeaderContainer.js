import React, { Component } from "react";
import Header from "../components/Header";
import axios from "axios";

export default class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/profile`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.token || localStorage.token}`,
        },
      })
      .then(res => {
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
