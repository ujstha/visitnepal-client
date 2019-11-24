import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { logOut, Loader } from "../services";
import { Helmet } from "react-helmet";

export default class Dashboard extends Component {
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
    axios
      .get(`${process.env.REACT_APP_BASEURL}/profile`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.token || localStorage.token}`,
        },
      })
      .then(res => {
        console.log(res);
        this.setState({
          userName: res.data.user.username,
        });
        axios
          .all([
            axios.get(
              `${process.env.REACT_APP_BASEURL}/user/details/with_user=${res.data.user.id}`
            ),
            axios.get(
              `${process.env.REACT_APP_BASEURL}/user/images/with_user=${res.data.user.id}`
            ),
          ])
          .then(
            axios.spread((userDetails, userImages) => {
              console.log(userDetails);
              console.log(userImages);
              this.setState({
                userImages: userImages.data,
                userDetails: userDetails.data,
                isLoading: false,
              });
            })
          );

        // if(res.data.user.isAdmin === 0) {
        //   document.location="/admin"
        // }
      })
      .catch(err => {
        console.log(err.response);
      });
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
          <div>
            <Helmet>
              <title>{`Dashboard | ${userName}`}</title>
            </Helmet>
            <h1>My Profile</h1>
            {userImages.map(a => a.id)}
            <br />
            <button onClick={() => logOut()}>Logout</button>
            {userDetails.map(a => a.id)}
          </div>
        )}
      </div>
    );
  }
}
