import store from "@/shared/redux/store";
import axios, { AxiosInstance } from "axios";
import { auth } from "./firebase";
import { clearAccessToken, setAccessToken } from "@/shared/redux/authSlice";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://eternal-odyssey-api.mekongai.com/api/v1/",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const idToken = state.auth.accessToken;

    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const user = auth.currentUser;
        if (!user) {
          await auth.signOut();
          store.dispatch(clearAccessToken());
          localStorage.removeItem("accessToken");
          sessionStorage.removeItem("accessToken");
          window.location.href = "/";
          throw new Error("Người dùng chưa đăng nhập");
        }

        const newIdToken = await user.getIdToken(true);

        store.dispatch(setAccessToken(newIdToken));

        originalRequest.headers.Authorization = `Bearer ${newIdToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Làm mới token thất bại:", refreshError);

        store.dispatch(clearAccessToken());
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
