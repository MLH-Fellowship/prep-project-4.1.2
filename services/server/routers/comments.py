from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional

from services.server.db.crud import get_db
from starlette.requests import Request
from sqlalchemy.orm import Session
from authlib.integrations.starlette_client import OAuth, OAuthError

from services.server.db import crud
import services.server.schemas as schemas

from services.server.routers.oauth import starlette_config
from starlette.responses import JSONResponse

from services.server.schemas import User
from services.server.verify import get_current_user


comment = APIRouter(
   tags=["comment"]
)
oauth = OAuth(starlette_config)


class Comment(BaseModel):
    comment: str


@comment.post('/', response_model=User)
async def email_subscribe(place_id: int, item: Comment, db: Session = Depends(get_db), user: User = Depends(get_current_user)):

    return crud.create_user_comment(db, item, place_id, user.email)

