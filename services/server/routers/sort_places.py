from fastapi import APIRouter, Depends, HTTPException
from db.crud import get_db
import schemas
from sqlalchemy.orm import Session
from db import crud, models

router = APIRouter()

@api_router.get("/", response_model=List[schemas.Place])  # 3
def get_posts(tag_name: str):

    if not tag_name:
        raise HTTPException(status_code=404, detail="Tag not provided")        

    return crud.get_place_by_tag(db, tag_name)

