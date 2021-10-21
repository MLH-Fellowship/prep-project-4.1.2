from typing import List
from fastapi import APIRouter, Depends, HTTPException
from db.crud import get_db
import schemas
from sqlalchemy.orm import Session
from db import crud

router = APIRouter()


@router.get("/{place_id}", response_model=schemas.Place)
def get_place(place_id: int, db: Session = Depends(get_db)):
    return crud.get_place_by_id(db, place_id)


@router.get("/", response_model=List[schemas.PlaceList])
def get_places(tag_name: str, db: Session = Depends(get_db)):
    if tag_name is None:
        raise HTTPException(status_code=400, detail="Tag required")

    return crud.get_places_by_tag(db, tag_name)
