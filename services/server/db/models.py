from os import name
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relation, relationship
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.schema import ForeignKey, Table
from sqlalchemy.sql.sqltypes import DateTime
from .database import Base
from geoalchemy2 import Geometry
from sqlalchemy.sql import func


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)


tags_places = Table('association', Base.metadata,
                    Column('tag_id', ForeignKey('tags.id'), nullable=False),
                    Column('place_id', ForeignKey('places.id'), nullable=False)
                    )


class Place(Base):

    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    num_votes = Column(Integer, default=0)
    state = Column(String)
    district = Column(String)
    tags = relationship("Tag", secondary=tags_places)
    comments = relationship("Comment")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    created = Column(DateTime(timezone=True), server_default=func.now())
    body = Column(String, nullable=False)
    place_id = Column(Integer, ForeignKey('places.id'),
                      primary_key=True, nullable=False)
    user_email = Column(String, ForeignKey('users.email'),
                        primary_key=True, nullable=False)
    user = relationship("User")


class Vote(Base):
    __tablename__ = "votes"

    created = Column(DateTime(timezone=True), server_default=func.now())
    place_id = Column(Integer, ForeignKey('places.id'),
                      primary_key=True, nullable=False)
    user_email = Column(String, ForeignKey('users.email'),
                        primary_key=True, nullable=False)
    user = relationship("User")


class Webhook(Base):
    __tablename__ = "webhooks"

    created = Column(DateTime(timezone=True), server_default=func.now())
    trigger_name = Column(String)
    url = Column(String)
    type = Column(String)
    place = Column(Geometry('POINT'), primary_key=True, nullable=False)
    user_email = Column(String, ForeignKey('users.email'),
                        primary_key=True, nullable=False)
    user = relationship("User")
