import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Slide, Fade } from "react-reveal";
import "../assets/css/userDashboard.css";
import { Modal, Tabs, Empty, Button } from "antd";
import UserPhotos from "./UserPhotos";
import UserDetails from "./UserDetails";

export default class Dashboard extends Component {
  render() {
    const {
      userImages,
      userDetails,
      userName,
      userData,
      onClick,
      showModal,
      onSubmit,
      profile_image,
      handleImage,
      image_name,
      profilePic
    } = this.props;
    return (
      <div className="user-dashboard">
        <Helmet>
          <title>{`Dashboard | ${userName}`}</title>
        </Helmet>
        <div className="row">
          <div className="col-md-12 profile-image">
            <div className="card rounded-0 p-0 m-0 bg-dark position-relative">
              <div className="position-relative">
                <img
                  src={
                    `${process.env.REACT_APP_IMAGEURL}/profile_images/` +
                    profilePic.profile_image
                  }
                  alt="profile"
                  className="profile-bg-img"
                />
                <div className="profile-bg-overlay"></div>
              </div>
              <div className="profile-img-rounded-container">
                <Slide left>
                  <div
                    className="position-relative img-round"
                    onClick={onClick}
                  >
                    <img
                      className="profile-img-rounded"
                      src={
                        `${process.env.REACT_APP_IMAGEURL}/profile_images/` +
                        profilePic.profile_image
                      }
                      alt="profile"
                    />
                    <div className="profile-img-rounded-overlay">
                      <h5 className="text-light">Update</h5>
                    </div>
                    <Modal
                      title="Update Profile Image"
                      visible={showModal}
                      onOk={() => onSubmit(userData.id)}
                      okText="Update"
                    >
                      <form
                        onSubmit={() => onSubmit(userData.id)}
                        encType="multipart/form-data"
                      >
                        <label
                          htmlFor="file-upload"
                          className="file-upload-button mt-2 mb-0"
                        >
                          <div className="file-name">
                            <i className="fas fa-upload fa-fw text-dark"></i>{" "}
                            &nbsp; {image_name}
                          </div>
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          className="rounded-0"
                          accept="image/*"
                          name={profile_image}
                          onChange={handleImage}
                        />
                      </form>
                    </Modal>
                  </div>
                  <Fade top>
                    <h2 className="text-capitalize">{userData.username}</h2>
                  </Fade>
                </Slide>
              </div>
            </div>
            <div className="col-md-12" style={{ marginTop: 100 }}>
              <Tabs defaultActiveKey="1" tabPosition="top">
                <Tabs.TabPane tab="About" key="1">
                  <UserDetails userDetails={userDetails} userData={userData} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Photos" key="2">
                  <UserPhotos userImages={userImages} />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
