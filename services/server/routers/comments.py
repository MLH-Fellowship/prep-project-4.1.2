from fastapi import APIRouter, Depends, HTTPException
from db.crud import get_db
import schemas
from sqlalchemy.orm import Session
from db import crud, models
from verify import get_current_user


router = APIRouter()


@router.post('/', response_model=schemas.Comment)
async def email_subscribe(comment: schemas.CommentBase, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    place = crud.get_place_by_id(db, comment.place_id)
    if place is None:
        raise HTTPException(status_code=404, detail="Place invalid")

    return crud.create_comment(db, user, place, comment.body)
