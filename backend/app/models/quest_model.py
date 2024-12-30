from pydantic import BaseModel
from typing import Optional, List
from app.models.item_model import ItemQuantity

class Rate(BaseModel):
    from_: int
    to: int

class RewardItem(BaseModel):
    itemId: str
    quantity: str
    rate: Optional[Rate] = None

class Reward(BaseModel):
    rewardItem: List[RewardItem]
    xp: int

class Quest(BaseModel):
    completionConditions: List[ItemQuantity]
    description: str
    questId: str
    reward: Reward
    target_description: str
    title: str
    type: int