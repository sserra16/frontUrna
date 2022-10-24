import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
