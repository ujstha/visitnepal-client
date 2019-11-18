import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { logOut } from "../services/UserFunction";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      userImages: null,
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
    return (
      <div className="App">
        <button onClick={() => logOut()}>Logout</button>
      </div>
    );
  }
}
