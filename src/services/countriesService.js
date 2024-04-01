import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getData(params) {
    const filter = params.filter ?? "";
    return apiClient.post(`${filter}`);
  },
};
