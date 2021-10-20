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
    place_id: int
    body: str


class Comment(CommentBase):
    id: int
    created: datetime
    user_email: str

    class Config:
        orm_mode = True
