import message from "antd/es/message";
import "antd/es/message/style";

export const handleCopy = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      message.success("Copied to clipboard");
    })
    .catch((err) => {
      message.error("Failed to copy to clipboard");
    });
};

export const normalizeString = (str: string) => {
  return str
    .normalize("NFD") // Tách dấu ra khỏi ký tự
    .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
    .toLowerCase() // Chuyển thành chữ thường
    .replace(/\s+/g, "_"); // Thay khoảng trắng bằng "_"
};
