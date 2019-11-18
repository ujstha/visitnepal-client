import React from "react";
import axios from "axios";

export default class pro extends React.Component {
  componentDidMount() {
    axios
      .get(`http://visitnepal-server.local/api/profile`, {
        headers: { Authorization : `Bearer ${sessionStorage.token || localStorage.token}`}
      })
      .then(res => {
        console.log(res);
        // if(res.data.user.isAdmin === 0) {
        //   document.location="/admin"
        // } 
      }).catch(err => {
        console.log(err.response)
      })
  };
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}
