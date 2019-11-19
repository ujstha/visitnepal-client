import axios from "axios";

export function getUserDetails(res, uD) {
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
      axios.spread((userDetail, userImage) => {
        var uA = uD.push(userImage.data);
        console.log(uA)
      })
    );
}
