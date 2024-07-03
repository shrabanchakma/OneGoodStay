import axios from "axios";
const axiosSecure = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
export default axiosSecure;

axiosSecure.interceptors.request.use(
  (config) => {
    console.log("sending request");
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosSecure.interceptors.response.use(
  (response) => {
    console.log("getting response");
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
