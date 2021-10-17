from sqlalchemy.orm.session import Session
from fastapi import APIRouter, Depends
from db import crud
from db.models import User, Vote
from verify import get_current_user


router = APIRouter()


@router.post('/', response_model=Vote)
def create_vote(place_id: int, user: User = Depends(get_current_user), db: Session = Depends(crud.get_db)):
    return crud.create_vote(db, user.email, place_id)
