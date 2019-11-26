import axios from "axios";

export default function Authorized() {
  return axios
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
    });
}
