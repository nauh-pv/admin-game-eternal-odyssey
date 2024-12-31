from fastapi import APIRouter, HTTPException, Depends, Request, Response
from app.models.user_model import UserRegister, UserLogin, Token, UserResponse
from app.services import user_service

router = APIRouter(
    prefix="/api/v1/users",  # Định nghĩa prefix cho các API liên quan đến người dùng
    tags=["Users"]          # Nhóm API trong tài liệu OpenAPI
)

@router.get("/", summary="Lấy danh sách người dùng", description="API này trả về danh sách tất cả người dùng.")
def get_all_users():
    try: 
      users = user_service.fetch_all_users()
      if not users:
        raise HTTPException(status_code=404, detail="No users found")
      return {"data": users, "message": "Successfully fetched users"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")

# API: Đăng ký
@router.post(
    "/register", 
    summary="Đăng ký người dùng", 
    description="API này tạo một người dùng mới với email, username và password.",
    response_model=Token
)
async def register(user: UserRegister):
    try:
        result = user_service.register_user(user)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) 
    except Exception as e:  # Lỗi không mong đợi
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# # API: Đăng nhập
@router.post(
    "/login",
    summary="Đăng nhập người dùng",
    description="API này cho phép người dùng đăng nhập bằng email và mật khẩu.")
async def login(request: Request):
    try:
        id_token = user_service.extract_token_from_header(request)
        
        return user_service.login_user(id_token)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# # API: Lấy thông tin người dùng hiện tại
# @router.get(
#     "/me", 
#     summary="Lấy thông tin người dùng hiện tại",
#     description="API này trả về thông tin người dùng hiện tại dựa trên token.",
#     response_model=UserResponse
# )
# async def get_me(current_user: dict = Depends(get_current_user)):
#     return current_user

@router.delete("/{user_id}", summary="Xóa người dùng")
async def delete_user_api(user_id: str):
    try:
        return user_service.delete_user(user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.patch("/{user_id}/password", summary="Đổi mật khẩu người dùng")
async def update_user_password_api(user_id: str, new_password: str):
    try:
        return user_service.update_user_password(user_id, new_password)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")