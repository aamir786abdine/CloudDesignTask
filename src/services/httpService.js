import axios from "axios";

const baseUrl = "http://localhost:2410";

function get(url) {
  return axios.get(baseUrl + url);
}

function post(url, obj) {
  return axios.post(baseUrl + url, obj);
}

function update(url, obj) {
  return axios.put(baseUrl + url, obj);
}

function remove(url) {
  return axios.delete(baseUrl + url);
}

export default {
  get,
  post,
  update,
  remove,
};
