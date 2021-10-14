from fastapi import FastAPI

app = FastAPI()


# use app.include_router to add another app's routes

@app.get("/")
async def root():
    return {"message": "Hello World"}
