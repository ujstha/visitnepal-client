import axios from "axios";
import { GetUserRole } from "./UserData";

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
        GetUserRole().then(res => {
          if (res) {
            document.location = "/dashboard";
          } else {
            document.location = "/dashboard";
          }
        });
      } else if (type === "register") {
        return res;
      }
    });
}

export function ResetPassword(email, passData) {
  return axios
    .post(`${process.env.REACT_APP_BASEURL + "/reset/" + email}`, passData)
    .then(res => {
      return res;
    });
}

export function logOut() {
  if (sessionStorage.token) {
    sessionStorage.removeItem("token");
  } else if (localStorage.token) {
    localStorage.removeItem("token");
  }
  localStorage.setItem("isAdmin", null);
  document.location = "/";
}
