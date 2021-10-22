FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

COPY ./requirements.txt /app/requirements.txt

RUN pip3 install --no-cache-dir /app/requirements.txt

# Weather notifications cron job
RUN apt-get -y install cron
RUN touch /var/log/cron.log
RUN (crontab -l ; echo "* * 1 * * echo "python3 /app/subscribe_cronjob.py" >> /var/log/cron.log") | crontab