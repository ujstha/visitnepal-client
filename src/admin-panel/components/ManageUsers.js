import React, { Component } from "react";
import { Select } from "antd";
import { ResetRole } from "../../services";

export default class ManageUsers extends Component {
  onSubmit = (id, data) => {
    ResetRole(id, data).then(res => console.log(res.data));
  };
  render() {
    const { users, usersImages } = this.props;
    return (
      <div className="w3-container" style={{ overflowX: "auto" }}>
        {users && users.length !== 0 ? (
          <>
            <a href="/manage/users">
              <h5 className="mt-3">
                <b>
                  <i className="fa fa-user"></i> &nbsp; Manage Users
                </b>
              </h5>
            </a>
            <table className="table table-striped table-responsive-lg">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Profile Image</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ width: 25 }}>
                      {index + 1}
                    </th>
                    <td style={{ width: 70 }}>
                      {usersImages
                        .filter(userImage => userImage.user_id === user.id)
                        .sort((itemA, itemB) =>
                          itemA.created_at < itemB.created_at ? 1 : -1
                        )
                        .map(
                          (userImage, index) =>
                            index === 0 && (
                              <img
                                key={index}
                                alt={user.id}
                                height="40"
                                width="40"
                                src={
                                  `${process.env.REACT_APP_IMAGEURL}/profile_images/` +
                                  userImage.profile_image
                                }
                                className="rounded-circle"
                              />
                            )
                        )}
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <Select
                        defaultValue={user.isAdmin === 1 ? "Admin" : "User"}
                        onChange={value => {
                          this.onSubmit(user.id, value);
                        }}
                      >
                        <Select.Option value="1">Admin</Select.Option>
                        <Select.Option value="0">User</Select.Option>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
          </>
        ) : (
          <>
            <hr />
            <h5 className="mt-3">
              <b>
                <i className="fa fa-user"></i> &nbsp; Manage Users
              </b>
            </h5>
            <h3 className="text-dark">No users were found on the database.</h3>
            <h6 className="text-dark">
              Users & their data will be listed here.
            </h6>
            <hr />
          </>
        )}
      </div>
    );
  }
}
