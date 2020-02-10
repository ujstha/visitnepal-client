import React, { Component } from "react";
import { GetPageByTitle } from "../services/PagesFuntion";
import Pages from "../components/Pages";
import { Redirect } from "react-router";

export default class PagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {}
    };
  }
  componentDidMount() {
    GetPageByTitle(this.props.match.params.title).then(res => {
      this.setState({
        page: res[0]
      });
    });
  }
  render() {
    const { page } = this.state;
    return page ? (
      <Pages page={page} />
    ) : (
      <Redirect to="/pages/404-not-found" />
    );
  }
}
