import axios from "axios";

export function GetRating() {
  return axios
    .get(
      `${process.env.REACT_APP_BASEURL + "/ratings"}`
    )
    .then(res => {
      return res;
    });
}

export function RatingFunction(on_city, by_user, ratingData, location) {
  return axios
    .post(
      `${process.env.REACT_APP_BASEURL +
        "/add/rating/on_city=" +
        on_city +
        "/by_user=" +
        by_user}`,
      ratingData
    )
    .then(res => {
      document.location.href = `${location}`;
      return res;
    });
}

export function RatingFunctionEdit(rating_id, by_user, ratingData, location) {
  return axios
    .post(
      `${process.env.REACT_APP_BASEURL +
        "/update/rating/with_id=" +
        rating_id +
        "/by_user=" +
        by_user}`,
      ratingData
    )
    .then(res => {
      document.location.href = `${location}`;
      return res;
    });
}
