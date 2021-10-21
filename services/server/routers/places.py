from typing import List
from fastapi import APIRouter, Depends, HTTPException
from db.crud import get_db
import schemas
from sqlalchemy.orm import Session
from db import crud

router = APIRouter()


@router.get("/", response_model=List[schemas.PlaceList])
def get_posts(tag_name: str, db: Session = Depends(get_db)):
    if tag_name is None:
        raise HTTPException(status_code=400, detail="Tag required")

    return crud.get_places_by_tag(db, tag_name)
