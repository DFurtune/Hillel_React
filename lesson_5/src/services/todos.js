import axios from "axios";

const API = `https://6675570ea8d2b4d072efa0bb.mockapi.io/todos`;

const service = {
  get: (id) =>
    axios(id ? API + `/${id}` : API)
      .then(({ data }) => data)
      .catch((err) => console.log(err)),
  delete: (id) =>
    axios
      .delete(API + `/${id}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err)),
  put: (id, item) =>
    axios
      .put(API + `/${id}`, item)
      .then(({ data }) => data)
      .catch((err) => console.log(err)),
  post: (item) =>
    axios
      .post(API, item)
      .then(({ data }) => data)
      .catch((err) => console.log(err)),
};

export default service;
