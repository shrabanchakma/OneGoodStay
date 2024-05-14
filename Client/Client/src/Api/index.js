import axios from "axios";
const axiosSecure = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: false,
});
export default axiosSecure;
