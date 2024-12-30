from fastapi import APIRouter, HTTPException, Depends, Request, Response
from app.models.world_model import World
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
    
@router.get("/", summary="Lấy danh sách tất cả các world")
async def get_all_worlds():
    try:
        all_worlds = world_service.fetch_all_worlds()
        return {"worlds": all_worlds}
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/{world_id}", summary="Lấy thông tin chi tiết của World", description="API này trả về thông tin chi tiết của một World dựa trên world_id.")
async def get_world_detail(world_id: str):
    try:
        world_detail = world_service.fetch_world_detail_by_id(world_id)
        if not world_detail:
            raise HTTPException(status_code=404, detail="World not found")

        return World(**world_detail)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.delete("/{world_id}", summary="Xóa một World", description="API này xóa một World dựa trên world_id.")
async def delete_world(world_id: str):
    try:
        result = world_service.delete_world_by_id(world_id)
        if not result:
            raise HTTPException(status_code=404, detail="World not found")
        return {"message": "World deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.delete("/{world_id}/users/{user_id}", summary="Xóa người chơi khỏi World")
async def delete_user_world(world_id: str, user_id: str):
    try:
        result = world_service.delete_user_from_world(world_id, user_id)
        if not result:
            raise HTTPException(status_code=404, detail="User or World not found")
        return {"message": "User removed from World successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.delete("/{world_id}/users/{user_id}/inventory/{item_id}", summary="Xóa vật phẩm khỏi Inventory")
async def delete_item_inventory_user(world_id: str, user_id: str, item_id: str):
    try:
        result = world_service.delete_item_from_inventory(world_id, user_id, item_id)
        if not result:
            raise HTTPException(status_code=404, detail="Item, User, or World not found")
        return {"message": "Item removed from Inventory successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.put("/{world_id}", summary="Cập nhật thông tin World")
async def update_world(world_id: str, updated_data: dict):
    try:
        result = world_service.update_world_by_id(world_id, updated_data)
        if not result:
            raise HTTPException(status_code=404, detail="World not found or update failed")
        return {"message": "World updated successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


