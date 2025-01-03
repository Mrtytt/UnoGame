import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Backend URL'niz
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

