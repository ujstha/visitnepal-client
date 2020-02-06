import axios from "axios";

const API = process.env.REACT_APP_BASEURL;

export function GetSlides() {
  return axios.get(`${API}/slider/all`).then(slides => {
    return slides.data;
  });
}

export function GetSlideById(id) {
    return axios.get(`${API}/slider/${id}`).then(slider => {
      return slider.data;
    });
  }

export function SlidesFunction(slidesData) {
  return axios.post(`${API + "/add/slides"}`, slidesData).then(res => {
    return res;
  });
}

export function UpdateSlideStatus(id, data) {
  return axios
    .post(`${process.env.REACT_APP_BASEURL + "/reset/status/" + id + "/" + data}`)
    .then(res => {
      return res;
    });
}

export function EditSlides(editSlideId, slidesData) {
  return axios
    .post(`${API + "/update/slide/with_id=" + editSlideId}`, slidesData)
    .then(res => {
      return res;
    });
}

export function DeleteSlide(slide_id, location) {
  return axios
    .delete(`${API + "/delete/slide/with_id=" + slide_id}`)
    .then(res => {
      document.location = `${location}`;
    });
}
