import React, { Component } from "react";
import { Tabs, Empty, Button } from "antd";

export default class UserDetails extends Component {
  render() {
    const { userDetails, userData } = this.props;
    return (
      <Tabs defaultActiveKey="1" tabPosition="left">
        <Tabs.TabPane tab="Basic Info" key="1">
          <table className="table table-borderless table-responsive basic-info-table">
            <thead>
              <tr>
                <th>BASIC INFORMATION</th>
              </tr>
            </thead>
            <hr />
            <tbody>
              <tr>
                <th>Username</th>
                <td>{userData.username}</td>
              </tr>
              <tr>
                <th>Firstname</th>
                <td className="text-capitalize">{userDetails ? userDetails.firstname : 'No firstname available'}</td>
              </tr>
              <tr>
                <th>Lastname</th>
                <td className="text-capitalize">{userDetails ? userDetails.lastname : 'No lastname available'}</td>
              </tr>
            </tbody>
          </table>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Contact Info" key="2">
          <table className="table table-responsive table-borderless contact-info-table">
            <thead>
              <tr>
                <th>CONTACT INFORMATION</th>
              </tr>
            </thead>
            <hr />
            <tbody>
              <tr>
                <th>Email</th>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td className="text-capitalize">
                {userDetails ? `${userDetails.city}, ${userDetails.country}` : 'No address available'}
                </td>
              </tr>
            </tbody>
          </table>
        </Tabs.TabPane>
      </Tabs>
    );
  }
}
