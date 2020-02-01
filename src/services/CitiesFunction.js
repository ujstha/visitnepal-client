import axios from "axios";

const API = process.env.REACT_APP_BASEURL;

export function CitiesFunction(citiesData) {
  return axios.post(`${API + "/add/city"}`, citiesData).then(res => {
    return res;
  });
}

export function AddCityImage(city_id, image) {
  return axios
    .post(`${API + "/city/add/image/" + city_id}`, image)
    .then(res => {
      return res;
    });
}

export function EditCities(editCityId, citiesData) {
  return axios
    .post(`${API + "/update/city/" + editCityId}`, citiesData)
    .then(res => {
      return res;
    });
}

export function EditCityImage(city_id, image_id, image) {
  return axios
    .post(
      `${API +
        "/city/update/image/with_id=" +
        image_id +
        "/with_city=" +
        city_id}`,
      image
    )
    .then(res => {
      return res;
    });
}

export function DeleteCity(city_id, location) {
  return axios.delete(`${API + "/delete/city/" + city_id}`).then(res => {
    document.location = `${location}`;
  });
}

export function DeleteImage(image_id) {
  return axios.delete(`${API + "/delete/city/image/image_id=" + image_id}`);
}
