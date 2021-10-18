from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str


class User(UserBase):

    class Config:
        orm_mode = True


class Comment(BaseModel):
    comment: str
    email: str
