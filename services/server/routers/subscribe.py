import re
from typing import List
from sqlalchemy.orm.session import Session
from fastapi import APIRouter, Depends, HTTPException
from schemas import User, Webhook, WebhookCreate, WebhookType
from db import crud
from verify import get_current_user
from db.crud import create_webhook, get_db


router = APIRouter()


@router.post('/', response_model=Webhook)
async def webhook_subscribe(webhook: WebhookCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if webhook.type == WebhookType.webhook:
        webhook_regex = re.compile(
            "https:\/\/(www\.|)(discord|discordapp)\.com\/api\/webhooks\/([\d]{18})\/([a-z0-9_-]+)")

        filtering = webhook_regex.match(webhook.url)

        if filtering is None:
            raise HTTPException(
                status_code=400, detail="Webhook url is invalid")

    return create_webhook(db, user, webhook)


@router.get('/', response_model=List[Webhook])
async def get_webhooks(user: User = Depends(get_current_user)):
    return crud.get_webhooks(user)
