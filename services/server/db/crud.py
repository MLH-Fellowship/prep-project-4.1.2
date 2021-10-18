from os import name
from sqlalchemy.orm import Session
from . import models
import schemas
from db.database import SessionLocal

# Dependency


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.User):
    db_user = models.User(email=user.email, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_user_comment(db: Session, item: schemas.Comment, place_id: int, email):
    comment = models.Comment(item.comment, place_id, email)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment
