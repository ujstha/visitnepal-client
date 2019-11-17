import axios from "axios";

export function UserFunction(type, userData) {
  axios
    .post(`http://visitnepal-server.local/api/${type}`, userData)
    .then(res => {
      console.log(res);
      if (type === "login") {
        localStorage.setItem("token", res.data.token);
        document.location = "/pro";
      } else if (type === "register") {
        document.location = "/login";
      }
    })
    .catch(err => {
      console.log(err.response);
    });
}
