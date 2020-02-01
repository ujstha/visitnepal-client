import axios from "axios";

const API = process.env.REACT_APP_BASEURL;

export function GetCities() {
  return axios.get(`${API}/cities`).then(cities => {
    return cities.data;
  });
}

export function GetCitiesImages() {
  return axios.get(`${API}/city/images/all`).then(images => {
    return images.data;
  });
}

export function GetCityById(id) {
  return axios.get(`${API}/cities/${id}`).then(city => {
    return city.data;
  });
}

export function GetImageByCityId(id) {
  return axios.get(`${API}/city/image/with_city=${id}`).then(image => {
    return image.data;
  });
}
export function GetRatingByCityId(id) {
  return axios.get(`${API}/ratings/with_city_id=${id}`).then(rating => {
    return rating.data;
  });
}
export function GetAvgRatingByCityId(id) {
  return axios.get(`${API}/ratings/avg/with_city_id=${id}`).then(rating => {
    return rating.data;
  });
}

export function GetCommentByCityId(id) {
  return axios.get(`${API}/comments/with_city_id=${id}`).then(comment => {
    return comment.data;
  });
}
