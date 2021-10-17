import os
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.responses import JSONResponse
import schemas
from starlette.config import Config
from starlette.requests import Request
from starlette.responses import HTMLResponse, RedirectResponse
from authlib.integrations.starlette_client import OAuth, OAuthError
from db import crud
from db.crud import get_db
from sqlalchemy.orm import Session
from verify import create_access_token
from datetime import timedelta

router = APIRouter()


GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID') or None
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET') or None
if GOOGLE_CLIENT_ID is None or GOOGLE_CLIENT_SECRET is None:
    raise BaseException('Missing env variables')

# Set up OAuth
config_data = {'GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID,
               'GOOGLE_CLIENT_SECRET': GOOGLE_CLIENT_SECRET}
starlette_config = Config(environ=config_data)
oauth = OAuth(starlette_config)


CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
oauth.register(
    name='google',
    server_metadata_url=CONF_URL,
    client_kwargs={
        'scope': 'openid email profile'
    }
)

# Frontend Host
FRONTEND_HOST = os.environ.get('FRONTEND_HOST') or 'http://localhost:3000'

# Frontend URL:
FRONTEND_URL = "{host}/oauth2callback".format(host=FRONTEND_HOST)


@router.get("/login_redirect")
async def login_redirect(req: Request):
    redirect_uri = FRONTEND_URL  # This creates the url for our /oauth2callback endpoint
    return await oauth.google.authorize_redirect(req, redirect_uri)


@router.get('/oauth2callback')
async def oauth2callback(req: Request, db: Session = Depends(get_db)):
    try:
        access_token = await oauth.google.authorize_access_token(req)
    except OAuthError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate credentials',
            headers={'WWW-Authenticate': 'Bearer'},
        )
    user_data = await oauth.google.parse_id_token(req, access_token)
    user = crud.get_user_by_email(db, user_data['email'])

    if not user:
        user = schemas.User(email=user_data.email, name=user_data.name)
        crud.create_user(db, user)

    payload = {key: user_data[key] for key in [
        'email', 'email_verified', 'name', 'picture', 'locale']}

    return JSONResponse({'result': True, 'access_token': create_access_token(payload, timedelta(weeks=+4))})


# {'iss': 'https://accounts.google.com', 'azp': '153729250130-mgekntsf4mea7os4pbhga4elull61bu8.apps.googleusercontent.com',
#  'aud': '153729250130-mgekntsf4mea7os4pbhga4elull61bu8.apps.googleusercontent.com', 'sub': '100961221647844405120',
#  'email': 'nikhilbn365@gmail.com', 'email_verified': True,
#     'at_hash': '8RCBef-0rhlPHBypKjYOJQ', 'nonce': 'epdsT03Pjah5cxYyxo3F',
#     'name': 'Nikhil BN', 'picture': 'https://lh3.googleusercontent.com/a-/AOh14GiiEE1sHEnKc-FhY1ffSG4EM_tz66cjtGF1UoWf=s96-c',
#     'given_name': 'Nikhil', 'family_name': 'BN', 'locale': 'en', 'iat': 1634212258, 'exp': 1634215858}
