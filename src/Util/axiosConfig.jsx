import axios from "axios";
import { BASE_URL } from "./apiEndpoints";
const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// list of endpoints that do not require authentication
const excludeEndPoints = [
  "/login",
  "/register",
  "/test",
  "/health",
  "/status",
  "/activate",
];
// interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndPoints.some((endpoint) => {
      return config?.url?.includes(endpoint);
    });
    if (!shouldSkipToken) {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const token = localStorage.getItem("token");

        // Only redirect if user is logged in
        if (token && !error.config.url.includes("/login")) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        return Promise.reject(error);
      } else if (error?.response?.status === 500) {
        console.error(
          "server error , please try again later, error message : ",
          error?.response?.data?.message
        );
      }
    } else if (error?.code === "ECONNABORTED") {
      console.error("request timed out , please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
