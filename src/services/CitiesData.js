import axios from "axios";

const API = process.env.REACT_APP_BASEURL;

export function GetCities() {
  return axios.get(`${API}/cities`).then(cities => {
    return cities.data.data;
  });
}

export function GetCategories() {
  return axios.get(`${API}/categories/all`).then(categories => {
    return categories.data;
  });
}

export function GetCitiesImages() {
  return axios.get(`${API}/city/images/all`).then(images => {
    return images.data;
  });
}

export function GetCityDetailsById() {
  return axios.get(`${API}/city/images/all`).then(images => {
    return images.data;
  });
}
