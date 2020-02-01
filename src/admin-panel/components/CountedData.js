import React, { Component } from "react";

export default class CountedData extends Component {
  render() {
    const { count } = this.props;
    return (
      <div className="w3-row-padding w3-margin-bottom">
        <div className="w3-quarter">
          <div className="w3-container w3-red w3-padding-16">
            <div className="w3-left">
              <i className="fa fa-comment w3-xxxlarge"></i>
            </div>
            <div className="w3-right">
              <h3>{count.comment_count}</h3>
            </div>
            <div className="w3-clear"></div>
            <h4>Reviews</h4>
          </div>
        </div>
        <div className="w3-quarter">
          <div className="w3-container w3-blue w3-padding-16">
            <div className="w3-left">
              <i className="fa fa-eye w3-xxxlarge"></i>
            </div>
            <div className="w3-right">
              <h3>{count.view_count}</h3>
            </div>
            <div className="w3-clear"></div>
            <h4>Views</h4>
          </div>
        </div>
        <div className="w3-quarter">
          <div className="w3-container w3-teal w3-padding-16 text-light">
            <div className="w3-left">
              <i className="fa fa-landmark w3-xxxlarge"></i>
            </div>
            <div className="w3-right">
              <h3>{count.city_count}</h3>
            </div>
            <div className="w3-clear"></div>
            <h4>Places</h4>
          </div>
        </div>
        <div className="w3-quarter">
          <div className="w3-container w3-orange w3-text-white w3-padding-16">
            <div className="w3-left">
              <i className="fa fa-users w3-xxxlarge"></i>
            </div>
            <div className="w3-right">
              <h3>{count.user_count}</h3>
            </div>
            <div className="w3-clear"></div>
            <h4>Users</h4>
          </div>
        </div>
      </div>
    );
  }
}
