backend-firebase/
├── app/
│ ├── **init**.py
│ ├── main.py # Điểm vào của FastAPI
│ ├── config.py # Cấu hình chung
│ ├── database.py # Kết nối với Firebase
│ ├── routes/ # API endpoints
│ │ ├── user_routes.py # Các API làm việc với người dùng
├── serviceAccountKey.json # Tệp key từ Firebase
├── requirements.txt # Danh sách các thư viện cần cài
