import axios from "axios";

const API = process.env.REACT_APP_BASEURL;

export function GetUser() {
  return axios
    .get(`${API}/profile`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.token || localStorage.token}`,
      },
    })
    .then(user => {
      return user;
    });
}

export function GetUserRole() {
  return GetUser().then(user => {
    if (sessionStorage.token || localStorage.token) {
      const userRole = user.data.user.isAdmin;
      if (userRole === 0) {
        return (localStorage.isAdmin = false);
      } else if (userRole === 1) {
        return (localStorage.isAdmin = true);
      }
    }
    if (
      JSON.stringify(sessionStorage.token) === "" &&
      JSON.stringify(localStorage.token) === ""
    ) {
      return (localStorage.isAdmin = null);
    }
  });
}

export function GetAllUsers() {
  return axios.get(`${API}/users/all`).then(allUser => {
    return allUser;
  });
}

export function GetAllUserDetails() {
  return axios.get(`${API}/user/details/all`).then(userDetail => {
    return userDetail;
  });
}

export function GetAllUserImages() {
  return axios.get(`${API}/user/images/all`).then(userImage => {
    return userImage;
  });
}

export function GetUserDetails(res) {
  return axios
    .get(`${API}/user/details/with_user=${res.data.user.id}`)
    .then(userDetail => {
      return userDetail;
    });
}

export function GetUserImages(res) {
  return axios
    .get(`${API}/user/images/with_user=${res.data.user.id}`)
    .then(userImage => {
      return userImage;
    });
}
