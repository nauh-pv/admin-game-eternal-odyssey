from fastapi import APIRouter, HTTPException, Depends, Request, Response
from app.models.world_model import World
from app.services import world_service

router = APIRouter(
    prefix="/api/v1/quests",
    tags=["Quests"]
)

@router.post("/", summary="Tạo mới một Quest")
async def create_quest(request: Request):
    try:
        data = await request.json()
        quest = world_service.create_quest(data)
        return quest
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")