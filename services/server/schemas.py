from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from enum import Enum
from geoalchemy2 import Geometry


class UserBase(BaseModel):
    email: str
    name: str


class User(UserBase):

    class Config:
        orm_mode = True


class VoteBase(BaseModel):
    place_id: int
    user_email: str


class Vote(VoteBase):
    created: datetime

    class Config:
        orm_mode = True


class CommentBase(BaseModel):
    place_id: int
    body: str


class Comment(CommentBase):
    id: int
    created: datetime
    user_email: str

    class Config:
        orm_mode = True


class Tag(BaseModel):
    name: str
    id: str


class PlaceBase(BaseModel):
    name: str
    state: str
    district: str
    description: str
    vote_count: int


class PlaceList(PlaceBase):

    class Config:
        orm_mode = True


class WebhookType(str, Enum):
    email = "email"
    webhook = "webhook"


class WebhookBase(BaseModel):
    trigger_name: str
    url: Optional[str]
    type: WebhookType


class WebhookCreate(WebhookBase):
    locationX: float
    locationY: float


class Webhook(WebhookBase):

    class Config:
        orm_mode = True
