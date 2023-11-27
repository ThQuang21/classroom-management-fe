import axios from "axios";
// httpInstance
const httpConfig = axios.create({
  timeout: 10000,
  withCredentials: true,
});

// http response interceptor
httpConfig.interceptors.response.use(
  (response) => {
    // we can determine to display from server, if messaged, display
    return response;
  },
  (error) => {
    // we handle errors here
    throw error;
  }
);
export default httpConfig;