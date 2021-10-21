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


class WebhookType(str, Enum):
    email = "email"
    webhook = "webhook"


class WebhookBase(BaseModel):
    trigger_name: str
    url: Optional[str]
    type: WebhookType


class WebhookCreate(WebhookBase):
    locationX: int
    locationY: int


class Webhook(WebhookBase):
    place: Geometry

    class Config:
        orm_mode = True
