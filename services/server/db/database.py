import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


DATABASE_URL = os.environ.get("DATABASE_URL")

if DATABASE_URL:
    SQLALCHEMY_DATABASE_URL = "postgresql" + DATABASE_URL[8:]
else:
    SQLALCHEMY_DATABASE_URL = "postgresql://{user}:{password}@{host}/{db}".format(
        user=os.environ.get('POSTGRES_USER'),
        password=os.environ.get('POSTGRES_PASSWORD'),
        db=os.environ.get('POSTGRES_DB'),
        host='db',
    )


engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
