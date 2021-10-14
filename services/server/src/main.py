from fastapi import FastAPI
from subscribe.webhook import webhook

app = FastAPI()
app.include_router(webhook)