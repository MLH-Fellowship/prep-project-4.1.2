import os
from fastapi import FastAPI, Depends
from routers import oauth, comments, votes, places, subscribe
from schemas import User
from verify import get_current_user
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from db import models
from db.database import engine


# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# use app.include_router to add another app's routes
app.include_router(oauth.router, prefix="/oauth")
app.include_router(votes.router, prefix="/votes")
app.include_router(comments.router, prefix="/comments")
app.include_router(places.router, prefix='/places')
app.include_router(subscribe.router, prefix="/subscribe")


ALLOWED_HOSTS = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Set up the middleware to read the request session
SECRET_KEY = os.environ.get('SECRET_KEY') or None
if SECRET_KEY is None:
    raise 'Missing SECRET_KEY'
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get('/example_protected_route', response_model=User)
async def protected_route(user: User = Depends(get_current_user)):
    return user
