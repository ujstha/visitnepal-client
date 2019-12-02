import axios from "axios";

export function CommentFunction(on_city, by_user, commentData, location) {
  return axios
    .post(
      `${process.env.REACT_APP_BASEURL +
        "/add/comment/on_city=" +
        on_city +
        "/by_user=" +
        by_user}`,
      commentData
    )
    .then(res => {
      document.location = `${location}`;
      return res;
    });
}

export function CommentFunctionEdit(
  comment_id,
  by_user,
  commentData,
  location
) {
  return axios
    .post(
      `${process.env.REACT_APP_BASEURL +
        "/update/comment/with_id=" +
        comment_id +
        "/by_user=" +
        by_user}`,
      commentData
    )
    .then(res => {
      document.location = `${location}`;
      return res;
    });
}
