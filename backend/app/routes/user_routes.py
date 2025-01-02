from fastapi import APIRouter, HTTPException, Depends, Request
from app.models.user_model import UserRegister, Token
from app.services import user_service
from app.dependencies.auth import verify_id_token_dependency

router = APIRouter(
    prefix="/api/v1/users",  # Định nghĩa prefix cho các API liên quan đến người dùng
    tags=["Users"]          # Nhóm API trong tài liệu OpenAPI
)

@router.get("/", summary="Lấy danh sách người dùng", description="API này trả về danh sách tất cả người dùng.")
def get_all_users(decoded_token: dict = Depends(verify_id_token_dependency)):
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

@router.get(
    "/{user_id}",
    summary="Lấy thông tin người dùng chi tiết",
    description="API này trả về thông tin chi tiết của một người dùng, bao gồm các world mà người dùng tham gia.",
)
async def get_user_details(user_id: str, decoded_token: dict = Depends(verify_id_token_dependency)):
    try:
        user_details = user_service.fetch_user_details(user_id)
        return {
            "data": user_details,
            "message": "Successfully fetched user details"
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.delete("/{user_id}", summary="Xóa người dùng")
async def delete_user_api(user_id: str, decoded_token: dict = Depends(verify_id_token_dependency)):
    try:
        return user_service.delete_user(user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.patch("/{user_id}", summary="Cập nhật thông tin người dùng")
async def update_user_api(user_id: str, user_update: dict, decoded_token: dict = Depends(verify_id_token_dependency)):
    try:
        updated_user = user_service.update_user_info(user_id, user_update)
        return {
            "data": updated_user,
            "message": "User information updated successfully"
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")