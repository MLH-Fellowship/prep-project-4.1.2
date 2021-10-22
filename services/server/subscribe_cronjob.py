from db.models import Webhook
from sqlalchemy import func
from db.crud import get_db
from db import models
import json
import requests
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart


class Notify:
    """
        Object: The SQLAlchemy db object.
    """

    def __init__(self, object, db, username="MLH", avatar="https://mlh.io/assets/logos/mlh-facebook-ae6144c0a3605f15992ee2970616db8d.jpg"):
        self.type = object.type
        self.url = object.url
        self.place = object.place
        self.email = object.user_email
        self.trigger_name = object.trigger_name
        self.avatar_url = avatar
        self.username = username
        self.point = object.place
        self.db = db

    def convert_location_to_xy(self):
        item = self.db.query(func.st_y(Webhook.place), func.st_x(
            Webhook.place)).filter(Webhook.user_email == self.email).first()
        return item

    def FetchWeather(self):
        converted = self.convert_location_to_xy()
        API_KEY = os.environ.get("API_KEY")
        url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=metric&appid={api_key}".format(
            lat=converted[0], lon=converted[1], api_key=API_KEY)
        r = requests.get(url)
        return ((json.loads(r.text)["current"])["weather"], (json.loads(r.text))["current"]["temp"])

    def webhook(self):
        information = self.FetchWeather()

        body = "*"*2 + self.trigger_name + "*"*2 + "\n" + \
            information[0][0]["description"] + " - " + \
            str(information[1]) + " degree celsius."
        data = {"content": body,
                "avatar_url": self.avatar_url,
                "username": self.username, }

        if self.url.startswith("https://discord.com/api/webhooks/") != False:
            r = requests.post(self.url, data)

    def Email(self):
        information = self.FetchWeather()
        port = os.environ.get("MAIL_PORT")
        password = os.environ.get("MAIL_PASSWORD")
        email_from = os.environ.get("MAIL_USERNAME")
        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
            message = MIMEMultipart()
            message["From"] = email_from
            message["To"] = self.email
            message["Subject"] = self.trigger_name
            message["Body"] = self.trigger_name + "\n" + information[0][0]["description"] + \
                " - " + str(information[1]) + " degree celsius."

            text = message.as_bytes()
            server.ehlo()
            # server.starttls(context = context)
            server.login(email_from, password)
            server.sendmail(email_from, self.email, msg=text)


db = next(get_db())


webhook_entries = db.query(models.Webhook).all()
for i in webhook_entries:
    notify = Notify(object=i, db=db)
    if i.type == "webhook":
        notify.webhook()
    elif i.type == "email":
        notify.Email()
