from fastapi import APIRouter
import re

webhook = APIRouter(
   tags = ["webhook"]
)

@webhook.post('/api/subscribe/webhook')
#add authentication filter here.
async def webhook_subscribe( webhook_url : str ):
    print(webhook_url)

    webhook_regex = re.compile("https:\/\/(www\.|)(discord|discordapp)\.com\/api\/webhooks\/([\d]{18})\/([a-z0-9_-]+)")
    filtering = webhook_regex.match(webhook_url)
    print(filtering, bool(filtering))
    if not bool(filtering):
        return {"status" : "failed", 
        "reason" : "incorrect discord webhook."}

    return {"status": "dummy"}