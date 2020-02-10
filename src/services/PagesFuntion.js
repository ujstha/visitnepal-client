import axios from "axios";

const API = process.env.REACT_APP_BASEURL;

export function GetPages() {
  return axios.get(`${API}/pages`).then(pages => {
    return pages.data;
  });
}

export function GetPageByTitle(title) {
    return axios.get(`${API}/page/${title}`).then(page => {
      return page.data;
    });
  }

  export function GetPageById(id) {
    return axios.get(`${API}/page/pageid/${id}`).then(page => {
      return page.data;
    });
  }

export function PagesFunction(pagesData) {
  return axios.post(`${API + "/add/page"}`, pagesData).then(res => {
    return res;
  });
}

export function EditPages(editPageId, pagesData) {
  return axios
    .post(`${API + "/update/page/" + editPageId}`, pagesData)
    .then(res => {
      return res;
    });
}

export function DeletePage(page_id, location) {
  return axios
    .delete(`${API + "/delete/page/" + page_id}`)
    .then(res => {
      document.location.href = `${location}`;
    });
}
