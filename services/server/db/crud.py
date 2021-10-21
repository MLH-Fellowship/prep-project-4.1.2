from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import desc
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


def get_place_by_id(db: Session, place_id: int):
    return db.query(models.Place).filter(models.Place.id == place_id).first()


def get_places_by_tag(db: Session, tag_name: str):
    ans = db.query(models.Place).join(models.Place.tags).filter(
        models.Tag.name == tag_name).order_by(desc(models.Place.vote_count)).limit(10).all()
    return ans


def create_vote(db: Session, user: models.User, place: models.Place):
    vote = models.Vote()
    vote.user = user
    place.votes.append(vote)
    place.vote_count += 1
    db.add(vote)
    db.commit()
    db.refresh(vote)
    return vote


def create_comment(db: Session, user: models.User, place: models.Place, body: str):
    comment = models.Comment(body=body)
    comment.user = user
    place.comments.append(comment)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def create_webhook(db: Session, user: models.User, webhook: schemas.WebhookCreate):
    db_webhook = models.Webhook(trigger_name=webhook.trigger_name,
                                url=webhook.url,
                                type=webhook.type,
                                place='POINT({x} {y})'.format(x=webhook.locationX, y=webhook.locationY))
    db_webhook.user = user
    user.webhooks.append(db_webhook)
    db.add(db_webhook)
    db.commit()
    db.refresh(db_webhook)
    return db_webhook


def get_webhooks(user: models.User):
    return user.webhooks
