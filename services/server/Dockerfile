FROM python:3.9


WORKDIR /code


COPY ./requirements.txt /code/requirements.txt


RUN pip3 install --no-cache-dir -r /code/requirements.txt


# Weather notifications cron job
RUN apt-get update
RUN apt-get -y install cron
RUN touch /var/log/cron.log
RUN (crontab -l ; echo "* * 1 * * echo "python3 /code/subscribe_cronjob.py" >> /var/log/cron.log") | crontab



COPY ./ /code/


CMD ["./start.sh"]
