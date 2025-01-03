from typing import Optional
from pydantic import BaseModel

class Health(BaseModel):
    current: int
    max: int

class Attributes(BaseModel):
    attackSpeed: int
    crit: int
    damage: dict
    health: Health
    intelligence: int
    resistance: int
    runSpeed: int