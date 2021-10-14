from fastapi import FastAPI
from .routers import oauth


app = FastAPI()


app.include_router(oauth.router, prefix="/oauth")


@app.get("/")
async def root():
    return {"message": "Hello World"}
