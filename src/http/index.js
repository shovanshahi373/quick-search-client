import axios from "axios";

export const http = axios.create({
  // baseURL:process.env.REACT_APP_SERVER
  baseURL: "http://localhost:5000",
});
