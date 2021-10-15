from os import name
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relation, relationship
from sqlalchemy.sql.schema import ForeignKey, Table
from sqlalchemy.sql.sqltypes import DateTime
from .database import Base
from geoalchemy2 import Geometry


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)


tags_places = Table('association', Base.metadata,
                    Column('tag_id', ForeignKey('tag.id')),
                    Column('place_id', ForeignKey('places.id'))
                    )


class Place(Base):

    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    num_votes = Column(Integer)
    state = Column(String)
    district = Column(String)
    tags = relationship("Tag", secondary=tags_places)
    comments = relationship("Comment")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    created = Column(DateTime)
    body = Column(String)
    place_id = Column(Integer, ForeignKey('places.id'), primary_key=True)
    user_email = Column(String, ForeignKey('users.email'), primary_key=True)
    user = relationship("User")


class Vote(Base):
    __tablename__ = "votes"

    created = Column(DateTime)
    place_id = Column(Integer, ForeignKey('places.id'), primary_key=True)
    user_email = Column(String, ForeignKey('users.email'), primary_key=True)
    user = relationship("User")


class Webhook(Base):
    __tablename__ = "webhooks"

    created = Column(DateTime)
    trigger_name = Column(String)
    url = Column(String)
    type = Column(String)
    place = Column(Geometry('POINT'), primary_key=True)
    user_email = Column(String, ForeignKey('users.email'), primary_key=True)
    user = relationship("User")
