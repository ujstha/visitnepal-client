import axios from "axios";

export function UserFunction(type, userData) {
  axios
    .post(`${process.env.REACT_APP_BASEURL + "/" + type}`, userData)
    .then(res => {
      console.log(res);
      if (type === "login") {
        if (JSON.parse(sessionStorage.rememberme) === true) {
          localStorage.setItem("token", res.data.token);
        } else {
          sessionStorage.setItem("token", res.data.token);
        }
        document.location = "/dashboard";
      } else if (type === "register") {
        document.location = "/";
      }
    })
    .catch(err => {
      console.log(err.response);
    });
}

export function logOut() {
  if (sessionStorage.token) {
    sessionStorage.removeItem("token");
  } else if (localStorage.token) {
    localStorage.removeItem("token");
  }
  document.location = "/";
}
