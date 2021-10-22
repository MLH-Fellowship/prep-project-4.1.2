FROM python:3.9


WORKDIR /code


COPY ./requirements.txt /code/requirements.txt


RUN pip3 install --no-cache-dir -r /code/requirements.txt


COPY ./ /code/


CMD ["./start.sh"]
