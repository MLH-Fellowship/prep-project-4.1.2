from sqlalchemy.orm.session import Session
from fastapi import APIRouter, Depends, HTTPException
from db import crud
from db.models import User
import schemas
from verify import get_current_user


router = APIRouter()


@router.post('/', response_model=schemas.Vote)
def create_vote(place_id: int, user: User = Depends(get_current_user), db: Session = Depends(crud.get_db)):
    place = crud.get_place_by_id(db, place_id)
    if place is None:
        raise HTTPException(status_code=404, detail="Place invalid")

    return crud.create_vote(db, user, place)
