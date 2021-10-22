from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey, Table
from sqlalchemy.sql.sqltypes import DateTime
from .database import Base
from geoalchemy2 import Geometry
from sqlalchemy.sql import func


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True,
                nullable=False, autoincrement=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    webhooks = relationship("Webhook", back_populates="user")


tags_places = Table('tags_places', Base.metadata,
                    Column('tag_id', ForeignKey('tags.id'), nullable=False),
                    Column('place_id', ForeignKey('places.id'), nullable=False)
                    )


class Place(Base):

    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True,
                nullable=False, autoincrement=True)
    vote_count = Column(Integer, default=0)
    name = Column(String, nullable=False)
    state = Column(String)
    district = Column(String)
    description = Column(String)
    tags = relationship("Tag", secondary=tags_places)
    comments = relationship("Comment")
    votes = relationship("Vote")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True,
                nullable=False, autoincrement=True)
    name = Column(String, nullable=False)
    picture = Column(String, nullable=False)


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    created = Column(DateTime(timezone=True), default=func.now())
    body = Column(String, nullable=False)
    place_id = Column(Integer, ForeignKey('places.id'), nullable=False)
    user_email = Column(String, ForeignKey('users.email'), nullable=False)
    user = relationship("User")


class Vote(Base):
    __tablename__ = "votes"

    created = Column(DateTime(timezone=True), default=func.now())
    place_id = Column(Integer, ForeignKey('places.id'),
                      primary_key=True, nullable=False)
    user_email = Column(String, ForeignKey('users.email'),
                        primary_key=True, nullable=False)
    user = relationship("User")


class Webhook(Base):
    __tablename__ = "webhooks"

    created = Column(DateTime(timezone=True), default=func.now())
    trigger_name = Column(String)
    url = Column(String)
    type = Column(String, nullable=False)
    place = Column(Geometry('POINT'), primary_key=True, nullable=False)
    user_email = Column(String, ForeignKey('users.email'),
                        primary_key=True, nullable=False)
    user = relationship("User", back_populates="webhooks")
