import json
import os
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from starlette.config import Config
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse, RedirectResponse
from authlib.integrations.starlette_client import OAuth, OAuthError


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

# Set up the middleware to read the request session
SECRET_KEY = os.environ.get('SECRET_KEY') or None
if SECRET_KEY is None:
    raise 'Missing SECRET_KEY'
router.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

# Frontend Host
FRONTEND_HOST = os.environ.get('FRONTEND_HOST') or 'http://web'

# Frontend URL:
FRONTEND_URL = "{host}/oauth2callback".format(host=FRONTEND_HOST)


@router.get("/login_redirect")
async def login_redirect(req: Request):
    redirect_uri = FRONTEND_URL  # This creates the url for our /oauth2callback endpoint
    return await oauth.google.authorize_redirect(req, redirect_uri)


@router.get('/oauth2callback')
async def oauth2callback(req: Request):
    try:
        access_token = await oauth.google.authorize_access_token(req)
    except OAuthError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate credentials',
            headers={'WWW-Authenticate': 'Bearer'},
        )
    user_data = await oauth.google.parse_id_token(req, access_token)
    # TODO: validate email in our database and generate JWT token
    jwt = f'valid-jwt-token-for-{user_data["email"]}'
    # TODO: return the JWT token to the user so it can make requests to our /api endpoint
    return JSONResponse({'result': True, 'access_token': jwt})
