import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { GetUserDetails, GetUser, GetUserImages, Loader } from "../services";
import Dashboard from "../components/Dashboard";

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      userImages: [],
      isLoading: true,
      userName: null,
    };
  }
  componentDidMount() {
    if (sessionStorage.token || localStorage.token) {
      GetUser().then(res => {
        console.log(res);
        this.setState({
          userName: res.data.user.username
        });
        GetUserDetails(res).then(res =>
          this.setState({
            userDetails: res.data,
            isLoading: false,
          })
        );
        GetUserImages(res).then(res =>
          this.setState({
            userImages: res.data,
          })
        );

        // if(res.data.user.isAdmin === 0) {
        //   document.location="/admin"
        // }
      });
    }
  }
  render() {
    if (!sessionStorage.token && !localStorage.token) {
      return <Redirect to="/" />;
    }
    const { userImages, userDetails, userName, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          Loader(isLoading)
        ) : (
          <Dashboard
            userImages={userImages}
            userDetails={userDetails}
            userName={userName}
          />
        )}
      </div>
    );
  }
}
