from pydantic import BaseModel
from typing import Optional
from models.attributes import Attributes

class ItemQuantity(BaseModel):
    itemId: str
    quantity: int

class Item(BaseModel):
    """
    Model đại diện cho một item.
    """
    attributes: Optional[Attributes]
    createTime: int
    description: str
    itemId: str
    name: str
    properties: int
    type: int
    usingTime: int
