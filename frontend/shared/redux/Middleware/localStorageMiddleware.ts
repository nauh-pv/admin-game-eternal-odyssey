// src/store/localStorageMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { setAccessToken, clearAccessToken } from "../authSlice";

// Tạo middleware tùy chỉnh để đồng bộ `accessToken` với `localStorage`
const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  // Tiếp tục thực thi các action trước
  const result = next(action);

  // Kiểm tra nếu action là setAccessToken hoặc clearAccessToken
  if (setAccessToken.match(action)) {
    if (action.payload) {
      // Lưu `accessToken` vào localStorage nếu có giá trị hợp lệ
      localStorage.setItem("accessToken", action.payload);
    }
  }

  if (clearAccessToken.match(action)) {
    // Xóa `accessToken` khỏi localStorage khi đăng xuất
    localStorage.removeItem("accessToken");
  }

  return result;
};

export default localStorageMiddleware;
