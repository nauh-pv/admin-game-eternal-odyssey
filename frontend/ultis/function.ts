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
