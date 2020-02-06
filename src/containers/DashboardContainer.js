import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  GetUserDetails,
  GetUser,
  GetUserImages,
  Loader,
  UploadImage
} from "../services";
import Dashboard from "../components/Dashboard";

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      userImages: [],
      profilePic: {},
      isLoading: true,
      userName: null,
      userData: {},
      profile_image: "",
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  handleImageChange = e => {
    this.setState({
      profile_image: e.target.files[0]
    });
  };

  updateImage = (userId) => {
    const formData = new FormData();
    formData.append("profile_image", this.state.profile_image);
    UploadImage(userId, formData).then(
      res => (document.location = "/dashboard")
    );
  };

  componentDidMount() {
    if (sessionStorage.token || localStorage.token) {
      GetUser().then(res => {
        this.setState({
          userName: res.data.user.username,
          userData: res.data.user
        });
        GetUserDetails(res).then(res =>
          this.setState({
            userDetails: res.data[0],
            isLoading: false
          })
        );
        GetUserImages(res).then(res =>
          this.setState({
            userImages: res.data,
            profilePic: res.data[0]
          })
        );
      });
    }
  }
  render() {
    if (!sessionStorage.token && !localStorage.token) {
      return <Redirect to="/" />;
    }
    const {
      userImages,
      userDetails,
      profile_image,
      userName,
      userData,
      showModal,
      profilePic,
      isLoading
    } = this.state;
    return (
      <div>
        {isLoading ? (
          Loader(isLoading)
        ) : (
          <Dashboard
            userImages={userImages}
            userDetails={userDetails}
            userName={userName}
            userData={userData}
            profilePic={profilePic}
            onClick={this.toggleModal}
            showModal={showModal}
            profile_image="profile_image"
            image_name={
              profile_image ? profile_image.name : "Upload an Image...."
            }
            handleImage={this.handleImageChange}
            onSubmit={this.updateImage}
          />
        )}
      </div>
    );
  }
}
