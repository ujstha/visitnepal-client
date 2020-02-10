import React, { Component } from "react";

export default class Pages extends Component {
  render() {
    const { page } = this.props;
    return (
      <div className="text-center">
        {page && (
          <>
            <h1 className="text-capitalize">{page.title}</h1>
            <h4>{page.body}</h4>
          </>
        )}
      </div>
    );
  }
}
