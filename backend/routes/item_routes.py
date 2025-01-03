from fastapi import APIRouter, HTTPException
from services import item_service

router = APIRouter(
    prefix="/api/v1/items",
    tags=["Items"]
)

@router.get("/", summary="Lấy danh sách tất cả các Item")
@router.get("", summary="Lấy danh sách tất cả các Item")
async def get_all_items():
    try:
        items = item_service.fetch_all_items()
        return {"data": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{item_id}", summary="Lấy thông tin chi tiết Item")
@router.get("/{item_id}/", summary="Lấy thông tin chi tiết Item")
async def get_item_detail(item_id: str):
    try:
        item = item_service.fetch_item_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        return item
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", summary="Tạo mới một Item")
@router.post("", summary="Tạo mới một Item")
async def create_item(item_data: dict):
    try:
        new_item = item_service.create_new_item(item_data)
        return {"message": "Item created successfully", "data": new_item}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/{item_id}", summary="Cập nhật thông tin Item")
@router.patch("/{item_id}/", summary="Cập nhật thông tin Item")
async def update_item(item_id: str, updated_data: dict):
    try:
        updated_item = item_service.update_item_by_id(item_id, updated_data)
        if not updated_item:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"message": "Item updated successfully", "data": updated_item}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{item_id}", summary="Xóa một Item")
@router.delete("/{item_id}/", summary="Xóa một Item")
async def delete_item(item_id: str):
    try:
        result = item_service.delete_item_by_id(item_id)
        if not result:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"message": "Item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
