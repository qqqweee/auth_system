import axios from "axios";

const API = axios.create({
  baseURL: "https://auth-system-h8qv.onrender.com/api",
  withCredentials: true
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await API.post("/auth/refresh");
        return API(originalRequest);
      } catch {
        window.location.href = "/";
      }
    }

    return Promise.reject(err);
  }
);

export default API;