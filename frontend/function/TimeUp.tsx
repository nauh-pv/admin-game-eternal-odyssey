import React, { useEffect } from "react";

interface CountdownProps {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  onTimeUp: () => void;
  status: boolean;
}

const Countdown = ({
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  onTimeUp,
  status,
}: CountdownProps) => {
  useEffect(() => {
    if (!status) return;

    // Sử dụng hàm cập nhật với callback để tránh phụ thuộc trực tiếp vào `minutes` và `seconds`
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            onTimeUp();
          } else {
            // Giảm `minutes` khi `seconds` = 0 và cập nhật `seconds` = 59
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          }
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Dọn dẹp interval khi component unmount hoặc `status` thay đổi
    return () => clearInterval(interval);
  }, [status, onTimeUp, setSeconds, setMinutes, minutes]);

  return (
    <div>
      <p>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
};

export default Countdown;
