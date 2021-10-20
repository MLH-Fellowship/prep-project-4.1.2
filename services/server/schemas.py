from datetime import datetime
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
    body: str
    place_id: int


class Comment(CommentBase):

    class Config:
        orm_mode: True
