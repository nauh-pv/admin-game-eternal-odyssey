from pydantic import BaseModel, EmailStr
from typing import Optional

# Schema để nhận dữ liệu đăng ký
class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Optional[str] = "admin"

# Schema để nhận dữ liệu đăng nhập
class UserLogin(BaseModel):
    IDTOken: str

# Token schema
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

# Schema cho thông tin trả về
class UserResponse(BaseModel):
    user_id: str
    username: str
    email: EmailStr
    token: Token