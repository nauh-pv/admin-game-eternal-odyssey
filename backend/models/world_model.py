from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict

from models.attributes import Attributes
from models.item_model import Item, ItemQuantity

class Experience(BaseModel):
    """
    Model cho thông tin kinh nghiệm của người chơi.
    """
    current: int
    max: int

class PlayerDetails(BaseModel):
    """
    Model cho thông tin chi tiết của người chơi.
    """
    attribute: Attributes
    experience: Experience
    level: int
    name: str
    properties: Optional[str] = ""
    skin: List[str]
    weaponLeft: Optional[str] = "" 
    weaponRight: Optional[str] = ""

class InventoryItem(BaseModel):
    itemId: str
    quantity: int

class Position(BaseModel):
    x: float
    y: float
    z: float

class Rotation(BaseModel):
    x: float
    y: float
    z: float

class PlayerWorld(BaseModel):
    userId: str
    characterState: int
    inventories: Optional[List[InventoryItem]] = None
    playerDetails: PlayerDetails
    playerStatus: int
    position: Position
    rotation: Rotation
    role: int

class QuestWorld(BaseModel):
    questId: str
    status: int
    progress_quest_world: List[ItemQuantity]

class World(BaseModel):
    worldId: str
    name: str
    code: str
    playerWorld: Optional[Dict[str, PlayerWorld]]
    questWorld: Optional[List[QuestWorld]]
    endAt: Optional[str] = None
    startAt: Optional[str] = None
    status: int
