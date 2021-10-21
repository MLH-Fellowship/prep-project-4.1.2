from datetime import datetime
from typing import List
from pydantic import BaseModel


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

    class Config:
        orm_mode = True


class PlaceBase(BaseModel):
    name: str
    state: str
    district: str
    description: str
    vote_count: int


class PlaceList(PlaceBase):

    class Config:
        orm_mode = True


class Place(PlaceBase):
    id: int
    tags: List[Tag]
    comments: List[Comment]

    class Config:
        orm_mode = True
