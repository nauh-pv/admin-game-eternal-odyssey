from fastapi import APIRouter, HTTPException
from app.services.user_service import fetch_all_users

router = APIRouter(
    prefix="/api/v1/users",  # Định nghĩa prefix cho các API liên quan đến người dùng
    tags=["Users"]          # Nhóm API trong tài liệu OpenAPI
)

@router.get("/", summary="Lấy danh sách người dùng", description="API này trả về danh sách tất cả người dùng.")
def get_all_users():
    try: 
      users = fetch_all_users()
      if not users:
        raise HTTPException(status_code=404, detail="No users found")
      return {"data": users, "message": "Successfully fetched users"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")

