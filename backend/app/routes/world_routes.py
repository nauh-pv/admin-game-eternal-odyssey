from fastapi import APIRouter, HTTPException, Depends, Request, Response
from app.models.user_model import UserRegister, UserLogin, Token, UserResponse
from app.services import world_service

router = APIRouter(
    prefix="/api/v1/worlds",
    tags=["Worlds"]
)

@router.get("/user/{user_id}", summary="Lấy danh sách các world của người dùng")
async def get_user_worlds(user_id: str):
    """
    API để lấy danh sách các world mà người dùng đang tham gia.
    """
    try:
        user_worlds = world_service.fetch_user_worlds(user_id)
        if not user_worlds:
            raise HTTPException(status_code=404, detail="User is not part of any world")
        return {"user_id": user_id, "worlds": user_worlds}
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))