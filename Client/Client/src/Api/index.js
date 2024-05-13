const axiosSecure = axios.create({
  baseURl: "http://localhost:8000/",
  useCredentials: true,
});
export default axiosSecure;
