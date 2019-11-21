import axios from "axios";

export function UserFunction(type, userData) {
  return axios
    .post(`${process.env.REACT_APP_BASEURL + "/" + type}`, userData)
    .then(res => {
      if (type === "login") {
        if (JSON.parse(sessionStorage.rememberme) === true) {
          localStorage.setItem("token", res.data.token);
        } else {
          sessionStorage.setItem("token", res.data.token);
        }
        document.location = "/dashboard";
      } else if (type === "register") {
        return res;
      }
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
