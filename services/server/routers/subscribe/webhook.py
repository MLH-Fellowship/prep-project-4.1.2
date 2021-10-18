from fastapi import APIRouter
from services.server.db import models
from services.server.schemas import User
from services.server.verify import get_current_user
from services.server.db.crud import get_db
from sqlalchemy.orm import Session
import re

router = APIRouter(
   tags = ["webhook"]
)

@router.post('/subscribe/webhook', response_model = User, user: User = Depends(get_current_user)).
async def webhook_subscribe( webhook_url : str, trigger_name : str, location : str):

    webhook_regex = re.compile("https:\/\/(www\.|)(discord|discordapp)\.com\/api\/webhooks\/([\d]{18})\/([a-z0-9_-]+)")
    filtering = webhook_regex.match(webhook_url)

    if not bool(filtering):
        return {"status" : "failed",
                "reason" : "incorrect discord webhook."}

    db = get_db()

    entry = models.Webhook(trigger_name = trigger_name, 
    url = webhook_url, 
    user_email = user.email, 
    type = "webhook", 
    place = location)

    db.add(entry)
    db.commit()

    return {"status" : "success"}