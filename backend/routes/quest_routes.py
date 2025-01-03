from fastapi import APIRouter, HTTPException
from services import quest_service

router = APIRouter(
    prefix="/api/v1/quests",
    tags=["Quests"]
)

@router.get("/", summary="Lấy danh sách tất cả các Quest")
async def get_all_quests():
    try:
        quests = quest_service.fetch_all_quests()
        return {"data": quests}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{quest_id}", summary="Lấy thông tin chi tiết Quest")
async def get_quest_detail(quest_id: str):
    try:
        quest = quest_service.fetch_quest_by_id(quest_id)
        if not quest:
            raise HTTPException(status_code=404, detail="Quest not found")
        return quest
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", summary="Tạo mới một Quest")
async def create_quest(quest_data: dict):
    try:
        new_quest = quest_service.create_new_quest(quest_data)
        return {"message": "Quest created successfully", "data": new_quest}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/{quest_id}", summary="Cập nhật thông tin Quest")
async def update_quest(quest_id: str, updated_data: dict):
    try:
        updated_quest = quest_service.update_quest_by_id(quest_id, updated_data)
        if not updated_quest:
            raise HTTPException(status_code=404, detail="Quest not found")
        return {"message": "Quest updated successfully", "data": updated_quest}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{quest_id}", summary="Xóa một Quest")
async def delete_quest(quest_id: str):
    try:
        result = quest_service.delete_quest_by_id(quest_id)
        if not result:
            raise HTTPException(status_code=404, detail="Quest not found")
        return {"message": "Quest deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
